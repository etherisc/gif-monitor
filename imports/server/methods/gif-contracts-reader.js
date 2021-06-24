/* GIF Contracts Reader */

console.log('loading gif-contracts-reader.js');

import { loadEvents } from '/imports/server/methods/gif-logs-reader.js';

const ethers = require('ethers');
const cbor = require('cbor');
const multihashes = require('multihashes');
const abiDecoder = require('abi-decoder');
const GifCli = require('@etherisc/gifcli');

const CBOR_PROCESSORS = [
	{ origin: "ipfs", process: multihashes.toB58String },
	{ origin: "bzzr0", process: (data) => ethers.utils.hexlify(data).slice(2) },
	{ origin: "bzzr1", process: (data) => ethers.utils.hexlify(data).slice(2) }
]

const cborDecode = (bytecode) => {
	const bytes = ethers.utils.arrayify(bytecode);
	const cborLength = bytes[bytes.length - 2] * 0x100 + bytes[bytes.length - 1];
	const bytecodeBuffer = Buffer.from(bytes.slice(bytes.length - 2 - cborLength, -2));
	const data = cbor.decodeFirstSync(bytecodeBuffer);
	for (const cborProcessor of CBOR_PROCESSORS) {
		const cborbytes = data[cborProcessor.origin];
		if (cborbytes) {
			const metadataId = cborProcessor.process(cborbytes);
			return {[cborProcessor.origin]: metadataId};
		}
	}

	const msg = `Unsupported metadata file format: ${Object.keys(data)}`;
	throw new Error(msg);
};

const ipfsLink = async (addr) => {

	const byteCode = await eth.provider.getCode(addr);
	console.log(byteCode.slice(0,32));
	return cborDecode(byteCode);

};

const getAbi = async (addr) => {

	const regIPFS = await ipfsLink(addr);
	const test = await fetch(`https://ipfs.infura.io/ipfs/${regIPFS.ipfs}`);
	const json = await test.json();

	return json.output.abi;
};	


const loadContracts = async () => {

	try {

		const { _id, registry_addr } = Instances.findOne({name: 'xDai'});

		// Bootstrap Registry

		const registryAbi = await getAbi(registry_addr);
		const Registry = new ethers.Contract(
			registry_addr, 						
			registryAbi, 
			eth.wallet
		);		

		let next = false;
		const release = await Registry.release();
		const contractsInRelease = await Registry.contractsInRelease(release);
		info(`Release: ${b32s(release)} / ${contractsInRelease} contracts`);

		for(var index = 0; index < contractsInRelease; index += 1) {

			const contractNameB32 = await Registry.contractNames(release, index);
			const contractName = b32s(contractNameB32);
			const contractAddress = await Registry.contracts(release, contractNameB32);
			const contractAbi = await getAbi(contractAddress);

			if (!Contracts.findOne({name: contractName})) {
				try {
					if (contractAbi.some(item => item.name === 'assignController')) {

						const controllerName = `${contractName}Controller`;
						console.log(controllerName);
						const controllerNameB32 = s32b(controllerName);
						const controllerAddress = Registry.contracts(release, controllerNameB32); 
						const controllerAbi = await getAbi(controllerAddress);
						info(`${contractName} is Storage with controller ${controllerName}; enriching ABI..`, {controllerName, controllerAddress});
						
						controllerAbi.forEach(item => { if (!contractAbi.some((it) => it.name === item.name)) {
							contractAbi.push(item); 
						}});
					}		

					const ipfs = await ipfsLink(contractConfig.address);
					info(`Inserting contract ${contractName} at ${contractAddress}`);
					Contracts.insert({
						instance_id: _id,
						name: contractName,
						abi: JSON.stringify(contractAbi), 
						address: contractAddress,
						ipfs
					});
				} catch(e) {
					error(`Error loading contract ${contractName}`, {message: e.message, stack: e.stack});
				}
			}
		}
	} catch (err) {
		error(`Error fetching contracts, ${err.message}`, err.stack);
	}
};

const reloadContracts = () => {

	Contracts.remove({});
	loadContracts().then(() => loadEvents());

}


module.exports = { loadContracts, reloadContracts };

