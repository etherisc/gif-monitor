/* GIF Contracts Reader */

console.log('loading gif-contracts-reader.js');

import { loadEvents } from '/imports/server/methods/gif-logs-reader.js';

const ethers = require('ethers');
const cbor = require('cbor');
const abiDecoder = require('abi-decoder');
const GifCli = require('@etherisc/gifcli');

const cborDecode = (bytecode) => {
	const bytes = eth.utils.hexToBytes(bytecode);
	const cborLength = bytes[bytes.length - 2] * 0x100 + bytes[bytes.length - 1];
	const bytecodeBuffer = Buffer.from(bytes.slice(bytes.length - 2 - cborLength, -2));
	return cbor.decodeFirstSync(bytecodeBuffer);
};

const ipfsLink = async (addr) => {

	const byteCode = await eth.provider.getCode(addr);
	return cborDecode(byteCode);

}


const loadContracts = async () => {

	try {
		const gif = await GifCli.connect();

		const { _id } = Chains.findOne({name: 'xDai'});

		// Bootstrap Registry

		const RegistryConfig = await gif.artifact.get('platform', 'development', 'Registry');
		const Registry = new ethers.Contract(
			RegistryConfig.address, 
			JSON.parse(RegistryConfig.abi), 
			eth.wallet
		);		

		let next = false;
		const release = await Registry.release();
		const contractsInRelease = await Registry.contractsInRelease(release);
		info(`Release: ${b32s(release)} / ${contractsInRelease} contracts`);
		for(var index = 0; index < contractsInRelease; index += 1) {

			const contractNameB32 = await Registry.contractNames(release, index);
			const contractName = b32s(contractNameB32);

			if (!Contracts.findOne({name: contractName})) {
				try {
					const contractAddress = await Registry.contracts(release, contractNameB32);
					const contractConfig = await gif.artifact.get('platform', 'development', contractName);
					if (contractConfig.address) {
						let abi = JSON.parse(contractConfig.abi);
						let abiObj = typeof abi === 'string' ? JSON.parse(abi) : abi;
						// Check if contract is storage with controller
						if (abiObj.some(item => item.name === 'assignController')) {
							const controllerConfig = await gif.artifact.get('platform', 'development', contractName + 'Controller');
							if (controllerConfig.address) {
								info(`${contractName} is Storage with controller ${contractName}Controller; enriching ABI..`, {controllerAddress: controllerConfig.address});
								let controllerAbiObj = JSON.parse(JSON.parse(controllerConfig.abi));
								controllerAbiObj.forEach(item => { if (!abiObj.some((it) => it.name === item.name)) {
									abiObj.push(item); 
								}});
								abi = JSON.stringify(abiObj);
							}
						}		

						const ipfs = ipfsLink(controllerConfig.address);
						info(`ipfs Link: ${ipfs}`);


						info(`Inserting contract ${contractName} at ${contractAddress}`);
						Contracts.insert({
							chain_id: _id,
							name: contractName,
							abi, 
							address: contractAddress,
							deployed_at_block: 0,
							ipfs
						});
					}
				} catch(e) {
					error(`Error loading contract ${contractName}`, {message: e.message, stack: e.stack});
				}
			}
		}
	} catch (err) {
		error(`Error fetching contracts, ${err.message}`);
	}
};

const reloadContracts = () => {

	Contracts.remove({});
	loadContracts().then(() => loadEvents());

}


module.exports = { loadContracts, reloadContracts };


