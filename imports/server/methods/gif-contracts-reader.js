/* GIF Contracts Reader */

console.log('loading gif-contracts-reader.js');

import { loadEvents } from '/imports/server/methods/gif-logs-reader.js';

const ethers = require('ethers');
const cbor = require('cbor');
const multihashes = require('multihashes');
const abiDecoder = require('abi-decoder');

const CBOR_PROCESSORS = [
	{ origin: "ipfs", process: multihashes.toB58String },
	{ origin: "bzzr0", process: (data) => ethers.utils.hexlify(data).slice(2) },
	{ origin: "bzzr1", process: (data) => ethers.utils.hexlify(data).slice(2) }
]

const cborDecode = (bytecode) => {
	try {
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
	} catch (err) {
	}
};

const ipfsLink = async (addr) => {
	const byteCode = await eth.provider.getCode(addr);
	const link = byteCode === '0x' ? '' : cborDecode(byteCode);
	// info(`ipfsLink`, {addr, byteCode, link}); 
	return link;

};

const getAbi = async (addr) => {

	const regIPFS = await ipfsLink(addr);
	if (regIPFS === '') return [];
	const gatewayLink = `https://gateway.pinata.cloud/ipfs/${regIPFS.ipfs}`;
	try {
		const data = await fetch(gatewayLink);
		const json = await data.json();
		return json.output.abi;
	} catch ({message, stack}) {
		error(`Couldn't fetch ipfs data, is it published? ${gatewayLink}`, {message, stack});
		return [];
	}
};	


const loadContracts = async () => {

	try {

		const { _id, registry_addr } = Instances.findOne({instance_id:101 });

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
						const controllerNameB32 = s32b(controllerName);
						const controllerAddress = await Registry.contracts(release, controllerNameB32); 
						if (controllerAddress !== '0x0000000000000000000000000000000000000000') {
							const controllerAbi = await getAbi(controllerAddress);
							info(`${contractName} is Storage with controller ${controllerName}; enriching ABI..`, {controllerName, controllerAddress});

							controllerAbi.forEach(item => { if (!contractAbi.some((it) => it.name === item.name)) {
								contractAbi.push(item); 
							}});
						}
					}		

					const ipfs = await ipfsLink(contractAddress);
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

