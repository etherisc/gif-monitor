/* Event Listeners */

console.log('loading event-listeners.js');
import { addListener } from '/imports/server/methods/gif-logs-reader.js';
import { loadSingleProduct } from '/imports/server/methods/gif-products-reader.js';
import { loadSingleOracle } from '/imports/server/methods/gif-oracles-reader.js';
import { getSingleMetadata } from '/imports/server/methods/gif-policies-reader.js';


const getValue = (name, decodedLog) => {
	return decodedLog.events.filter(value => value.name == name)[0].value;
}

const reloadSingleProductFromLog = (eventData, decodedLog) => {
	
	const productId = parseInt(getValue('productId', decodedLog));
	loadSingleProduct({ productId });
	
};

const reloadSingleOracleFromLog = (eventData, decodedLog) => {
	
	const oracleId = parseInt(getValue('oracleId', decodedLog));
	loadSingleOracle({ oracleId });
	
};

const loadPolicy = (eventData, decodedLog) => {
	const bpKey = getValue('bpKey', decodedLog);
	getSingleMetadata(bpKey);

}


const addListeners = () => {

	addListener(['LogProductProposed', 'LogProductSetState'], reloadSingleProductFromLog );
	addListener(['LogOracleProposed', 'LogOracleSetState'], reloadSingleOracleFromLog );
	addListener([
		'LogNewMetadata', 
		'LogNewApplication', 
		'LogNewPolicy', 
		'LogNewClaim', 
		'LogNewPayout', 
		'LogPayoutCompleted', 
		'LogPartialPayout',
	], loadPolicy );

};

module.exports = { addListeners };


/*

event LogApplicationStateChanged (bytes32 bpKey, uint8 state) 
event LogClaimStateChanged (bytes32 bpKey, uint256 claimId, uint8 state) 
event LogMetadataStateChanged (bytes32 bpKey, uint8 state) 
event LogNewApplication (uint256 productId, bytes32 bpKey) 
event LogNewClaim (bytes32 bpKey, uint256 claimId, uint8 state) 
event LogNewMetadata (uint256 productId, bytes32 bpKey, uint8 state) 
event LogNewPayout (bytes32 bpKey, uint256 claimId, uint256 payoutId, uint8 state) 
event LogNewPolicy (bytes32 bpKey) 
event LogPartialPayout (bytes32 bpKey, uint256 payoutId, uint8 state) 
event LogPayoutCompleted (bytes32 bpKey, uint256 payoutId, uint8 state) 
event LogPayoutStateChanged (bytes32 bpKey, uint256 payoutId, uint8 state) 
event LogPolicyStateChanged (bytes32 bpKey, uint8 state) 


*/
