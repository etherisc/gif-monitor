
console.log('loading helpers.js');

Helpers = {};

Helpers.pre = function(text) {
	return new Handlebars.SafeString('<pre class="code">' + text + '</pre>');
};


Helpers.txLink = function(txHash) {
	return new Handlebars.SafeString(`<a href="https://blockscout.com/xdai/mainnet/tx/${txHash}" target="_blank">${txHash.slice(0,10)}...</a>`);
};

Helpers.addressLink = function(address) {
	return new Handlebars.SafeString(`<a href="https://blockscout.com/xdai/mainnet/address/${address}" target="_blank">${address.slice(0,10)}...</a>`);
};


stateMessage = {
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

Helpers.policyState = (state) => statemessage.policy[state];
Helpers.applicationState = (state) => statemessage.application[state];
Helpers.claimState = (state) => statemessage.claim[state];
Helpers.policyFlowState = (state) => statemessage.policyFlow[state];
Helpers.payoutState = (state) => statemessage.payout[state];

/********************* INSERT NEW HELPERS ABOVE *************************/


/* Register all Helpers */

_.each(Helpers, function (helper, key) {
	Handlebars.registerHelper(key, helper);
});




