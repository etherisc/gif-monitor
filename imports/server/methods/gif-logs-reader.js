/* GIF Logs Reader */

console.log('loading gif-logs-reader.js');

const ethers = require('ethers');
const abiDecoder = require('abi-decoder');



const processEvent = (contractName, event) => {

	const decodedLog = abiDecoder.decodeLogs([event])[0];

	const valuesWithText = decodedLog.events.map(
		value => {
			if (value.type === 'bytes32') {
				value.text = ethers.utils.parseBytes32String(value.value);
			}
			return value;
		});

	Events.upsert(
		{block_number: event.blockNumber, log_index: event.logIndex}, 
		{$set: {
			block_number: event.blockNumber,
			contract: contractName,
			address: event.address,
			transaction_hash: event.transactionHash,
			log_index: event.logIndex,
			event: decodedLog.name,
			values: decodedLog.events, 
			timestamp: new Date(eth.blockTimestamp(event.blockNumber))
		}}
	);
	EventLastSeen.upsert({name: decodedLog.name}, {$set: {last_seen: event.blockNumber}});
};


const processRecentEvents = async (contractName, eventName, filter) => {

	info(`ProcessRecentEvents ${contractName} / ${eventName}`, {contractName, eventName, filter});
	const last = EventLastSeen.findOne({name: eventName});
	filter.fromBlock = last ? last.last_seen + 1 : 0;
	filter.toBlock = 'latest';

	try {

		const logs = await eth.provider.getLogs(filter);
		info(`${contractName} / ${eventName}: ${logs.length} events found.`);
		logs.map(event => processEvent(contractName, event));

	} catch (e) {
		error(`Log processing failed (${e.message})`);
	}	
}


const loadEvents = async () => {

	const contracts = Contracts.find({}).fetch();

	for (contract_idx = 0; contract_idx < contracts.length; contract_idx += 1) {

		const contractConfig = contracts[contract_idx];
		const contractName = contractConfig.name;
		const contractAddress = contractConfig.address;
		const contractAbi = contractConfig.abi;
		const contractEvents = contractAbi.filter(item => item.type === 'event');


		abiDecoder.addABI(contractAbi);
		const Contract = await getContract(contractName);
		


		for(var idx = 0; idx < contractEvents.length; idx += 1) {

			const eventName = contractEvents[idx].name;
			const filter = Contract.filters[eventName]();
			Contract.removeAllListeners(eventName);
			Contract.on(
				eventName, 
				Meteor.bindEnvironment(() => processRecentEvents(contractName, eventName, filter))
			);
			await processRecentEvents(contractName, eventName, filter);

		}	

	}
};


const reloadEvents = () => {

	Events.remove({});
	EventLastSeen.remove({});
	loadEvents();
};


module.exports = { loadEvents, reloadEvents };

