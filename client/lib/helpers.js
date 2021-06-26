
console.log('loading helpers.js');

Helpers = {};

Helpers.pre = function(text) {
	return new Handlebars.SafeString('<pre class="code">' + text + '</pre>');
};

Helpers.ipfsLink = function(ipfs) {
	
	return new Handlebars.SafeString(`<a href="/ipfs/${ipfs.ipfs}" target="_blank">/ipfs/${ipfs.ipfs}</a>`);
};

Helpers.txLink = function(txHash) {
	return new Handlebars.SafeString(`<a href="https://blockscout.com/xdai/mainnet/tx/${txHash}" target="_blank">${txHash.slice(0,10)}...</a>`);
};

Helpers.addressLink = function(address) {
	return new Handlebars.SafeString(`<a href="https://blockscout.com/xdai/mainnet/address/${address}" target="_blank">${address.slice(0,10)}...</a>`);
};

Helpers.addressLongLink = function(address) {
	return new Handlebars.SafeString(`<a href="https://blockscout.com/xdai/mainnet/address/${address}" target="_blank">${address}</a>`);
};



stateMessage = {
	
	product: [
		'Proposed',
		'Approved',
		'Paused'
		],
	oracle: [
		'Inactive',
		'Active'
		],
	oracleType: [
		'Inactive',
		'Active'
		],
	oracleAssignment: [
		'Unassigned',
		'Proposed',
		'Assigned'
		],
	policy: [
		'Active',
		'Expired'
		],
	claim: [
		'Applied',
		'Confirmed',
		'Declined'
		],
	application: [
		'Applied',
		'Revoked',
		'Underwritten',
		'Declined'
		],
	policyFlow: [
		'Started',
		'Paused',
		'Finished'
		],
	payout: [
		'Expected',
		'PaidOut'
		]
};

Helpers.productState = (state) => stateMessage.product[state];
Helpers.oracleState = (state) => stateMessage.oracle[state];
Helpers.oracleTypeState = (state) => stateMessage.oracleType[state];
Helpers.oracleAssigmentState = (state) => stateMessage.oracleAssignment[state];
Helpers.policyState = (state) => stateMessage.policy[state];
Helpers.applicationState = (state) => stateMessage.application[state];
Helpers.claimState = (state) => stateMessage.claim[state];
Helpers.policyFlowState = (state) => stateMessage.policyFlow[state];
Helpers.payoutState = (state) => stateMessage.payout[state];

Helpers.isProductState = (state) => {
	console.log(this); 
	return true;
};

/********************* INSERT NEW HELPERS ABOVE *************************/


/* Register all Helpers */

_.each(Helpers, function (helper, key) {
	Handlebars.registerHelper(key, helper);
});




