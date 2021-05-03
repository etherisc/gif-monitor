/* GIF Contracts Reader */

console.log('loading gif-contracts-reader.js');

import { loadEvents } from '/imports/server/methods/gif-logs-reader.js';

const ethers = require('ethers');
const abiDecoder = require('abi-decoder');
const GifCli = require('@etherisc/gifcli');

contracts = {}; // global contracts object

const getContract = async (contractName, mode) => {
		
	if (contracts[contractName]) {
		return contracts[contractName];
	}
	
	const contractConfig = Contracts.findOne({name: contractName});
	if (!contractConfig) {
		error(`Contract ${contractName} not found!`);
		return;
	}

	const Contract = new ethers.Contract(
		contractConfig.address, 
		contractConfig.abi, 
		eth.wallet
	);		
	
	contracts[contractName] = Contract
	
	return Contract;
}


const loadContracts = async() => {

	try {
		const gif = await GifCli.connect();

		const { _id } = Chains.findOne({name: 'xDai'});
		
		// Bootstrap Registry

		const RegistryConfig = await gif.artifact.get('platform', 'development', 'Registry');
		console.log(RegistryConfig);
		const Registry = new ethers.Contract(
			RegistryConfig.address, 
			RegistryConfig.abi, 
			eth.wallet
		);		

		let next = false;
		const release = await Registry.release();
		const contractsInRelease = await Registry.contractsInRelease(release);
		console.log(`Release: ${ethers.utils.parseBytes32String(release)} / ${contractsInRelease} contracts`);
		for(var index = 0; index < contractsInRelease; index += 1) {

			const contractNameB32 = await Registry.contractNames(release, index);
			const contractName = ethers.utils.parseBytes32String(contractNameB32);

			if (!Contracts.findOne({name: contractName})) {
				try {
					const contractAddress = await Registry.contracts(release, contractNameB32);
					const contractConfig = await gif.artifact.get('platform', 'development', contractName);
					if (contractConfig.address) {
						const abi = JSON.parse(contractConfig.abi);
						info(`Inserting contract ${contractName} at ${contractAddress}`);
						Contracts.insert({
							chain_id: _id,
							name: contractName,
							abi, 
							address: contractAddress,
							deployed_at_block: 0
						});
					}
				} catch(e) {
					error(`Error loading contract ${contractName}`);
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


