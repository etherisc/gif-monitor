/* GIF Logs Reader */

console.log('loading gif-logs-reader.js');

const ethers = require('ethers');
const abiDecoder = require('abi-decoder');

const listeners=[];

const processEvent = (contractName, eventData) => {

	const decodedLog = abiDecoder.decodeLogs([eventData])[0];
	const { blockNumber, transactionHash, logIndex, address } = eventData

	const valuesWithText = decodedLog.events.map(
		value => {
			if (value.type === 'bytes32') {
				value.text = b32s(value.value);
			}
			return value;
		});

	const event = decodedLog.name;

	Events.upsert(
		{block_number: blockNumber, log_index: logIndex}, 
		{$set: {
			block_number: blockNumber,
			contract: contractName,
			address: address,
			transaction_hash: transactionHash,
			log_index: logIndex,
			event,
			values: decodedLog.events, 
			timestamp: new Date(eth.blockTimestamp(blockNumber))
		}}
	);
	EventLastSeen.upsert({event}, {$set: {last_seen: blockNumber}});

	if (listeners[event]) {
		info(`Execute Listeners for ${event}`);
		listeners[event].map(cb => {
			info(`Execute listener ${cb.name}`);
			cb(eventData, decodedLog);
		});
	}

};


const addListener = (event, cb) => {

	const addOneListener = (event, cb) => {

		if (listeners[event]) {
			listeners[event].push(cb);
		} else {
			listeners[event] = [cb];
		}
		info(`Added Listener for ${event}`);
	}

	if (Array.isArray(event)) {
		event.map(ev => addOneListener(ev, cb));
	} else {
		addOneListener(event, cb);
	}
}

const processRecentEvents = async (contractName, contractAddress, eventName, filter) => {

	info(`ProcessRecentEvents ${contractName} / ${eventName}`, {contractName, contractAddress, eventName, filter});
	const last = EventLastSeen.findOne({event: eventName});
	filter.fromBlock = last ? last.last_seen + 1 : 0;
	filter.toBlock = 'latest';

	try {

		const logs = await eth.provider.getLogs(filter);
		info(`${contractName} / ${eventName}: ${logs.length} events found.`);
		logs.map(event => processEvent(contractName, event));

	} catch ({message, stack}) {
		error(`Log processing failed (${message})`, {message, stack});
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

		info(`LoadEvents for ${contractName} at ${contractAddress}`, contractConfig);
		
		abiDecoder.addABI(contractAbi);
		const Contract = await getContract(contractName);
		


		for(var idx = 0; idx < contractEvents.length; idx += 1) {

			const eventName = contractEvents[idx].name;
			const filter = Contract.filters[eventName]();
			Contract.removeAllListeners(eventName);
			Contract.on(
				eventName, 
				Meteor.bindEnvironment(() => processRecentEvents(contractName, contractAddress, eventName, filter))
			);
			await processRecentEvents(contractName, contractAddress, eventName, filter);

		}	

	}
};
 

const reloadEvents = () => {

	Events.remove({});
	EventLastSeen.remove({});
	loadEvents();
};


module.exports = { addListener, loadEvents, reloadEvents };

