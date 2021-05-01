
console.log('loading globals.js');


import dotenv from 'dotenv'
dotenv.config( {
  path: `${process.env.PWD}/.env`
} );


const ethers = require('ethers');

eth = {}
eth.provider = new ethers.providers.JsonRpcProvider('https://xdai-rpc.etherisc.com');
eth.provider.getBlockNumber().then(console.log);
eth.wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC).connect(eth.provider)

eth.blockTimestamp = Meteor.wrapAsync(async (blockNumber, done) => {
	
	try {
		const block = await eth.provider.getBlock(blockNumber);
		done(null, block.timestamp * 1000);
	} catch (err) {
		done(err, null);
	}
});

eth.transactionTimestamp = Meteor.wrapAsync(async (tx, done) => {
	
	try {
		const transaction = await eth.provider.getTransaction(tx);
		done(null, eth.blockTimestamp(transaction.blockNumber));
	} catch (err) {
		done(err, null);
	}
	
});

contracts = {};

getContract = async (contractName, mode) => {
		
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