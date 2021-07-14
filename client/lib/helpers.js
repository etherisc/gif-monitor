
console.log('loading helpers.js');
import { ethers } from 'ethers';

b32s = (b32) => {
	return ethers.utils.parseBytes32String(b32);
}

s32b = (text) => {
	return ethers.utils.formatBytes32String(text.slice(0,31))
}

stateMessage = {
	
	product: [ 'Proposed', 'Approved', 'Paused' ],
	oracle: [ 'Inactive', 'Active' ],
	oracleType: [ 'Inactive', 'Active'],
	oracleAssignment: [ 'Unassigned', 'Proposed', 'Assigned' ],
	policy: [ 'Active', 'Expired' ],
	claim: [ 'Applied', 'Confirmed', 'Declined' ],
	application: [ 'Applied', 'Revoked', 'Underwritten', 'Declined' ],
	policyFlow: [ 'Started', 'Paused', 'Finished' ],
	payout: [ 'Expected', 'PaidOut' ]
};

const mapHeader = (key) => {
	
	const dict = {
		"name": "Name",
		"transaction_no": "hidden",
		"internalType": "hidden",
		"indexed": "hidden"
	}; 
	return dict[key] === 'hidden' ? null : (dict[key] ? dict[key] : key);
};

const mapVal = (key, val, data) => {
	
	switch (key) {

		default: return val;

	}
};


Helpers = {};

Helpers.pre = (text) => new Handlebars.SafeString(`<pre class="code">${text}</pre>`);
Helpers.safeStr = (str) => new Handlebars.SafeString(str ? str : '');

json2table = function(value, data) {
	if (!value) return '';
	const jsn = typeof value === 'string' ? JSON.parse(value) : value;
	const rows = Object
	.keys(jsn)
	.map(item => mapHeader(item) ? `<tr><td>${mapHeader(item)}</td><td>${mapVal(item, jsn[item], data)}</td><tr>` : '')
	.join("\n");
	const table = rows === '' ? '' : 
	`<table class="custom-param-table">
<tbody>
${rows}
</tbody> 
</table>`;

	/*

<thead>
<tr><th>Param</th><th>Value</th></tr>
</thead>

*/
	return new Handlebars.SafeString(table);
};

Helpers.json2table = json2table;

array2table = (arrVal) => {
	try {
		if (!arrVal || !Array.isArray(arrVal)) return '';
		const headers = Object.keys(arrVal[0]);
		const header = `<thead><tr>${headers.map((key) => mapHeader(key) ? `<th>${mapHeader(key)}</th>` : '').join('')}</tr></thead>`;
		const body = arrVal.map((row) => `<tr>${headers.map((key) => mapHeader(key) ? `<td>${mapVal(key, row[key])}</td>` : '').join('')}</tr>`).join('\n');
		return new Handlebars.SafeString(`<table class="custom-param-table">${header}${body}</table>`);
	} catch (err) {
		return '';
	}
};

Helpers.array2table = array2table;

const textRed = (t) => `<span class='text-danger'>${t}</span>`;
const textBlue = (t) => `<span class='text-primary'>${t}</span>`;
const textOrange = (t) => `<span class='text-warning'>${t}</span>`;
const atomSingle = (io) => `${textOrange(io.type)}${io.name ? ` ${textBlue(io.name)}` : ''}`;
const abiSingle = (signature) => {
	
	const name = signature.name ? signature.name : '<anonymous>';
	const inputs = signature.inputs ? `(${signature.inputs.map(atomSingle).join(', ')})` : '()';
	const outputs = signature.outputs && signature.outputs.length > 0 ? `${textRed('returns')} (${signature.outputs.map(atomSingle).join(', ')})` : '';
	
	return `${textRed(signature.type)} ${name} ${inputs} ${outputs}`;

};

Helpers.abi2table = (abi) => {
	const tbl = abi.map(abiSingle).join('<br />');
	return new Handlebars.SafeString(`<pre>${tbl}</pre>`);
};

Helpers.ipfsLink = function(ipfs) {
	
	return new Handlebars.SafeString(`<a href="https://gateway.pinata.cloud/ipfs/${ipfs.ipfs}" target="_blank">/ipfs/${ipfs.ipfs}</a>`);
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

Helpers.bpdoc = (val, doc) => {
	const res = ReactiveMethod.call('bpData', doc.bp_key);
	console.log(res);
	return res;
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

Helpers.isProductState = (state, data) => {
	return stateMessage.product[data.product.state] === state;
};

/********************* INSERT NEW HELPERS ABOVE *************************/


/* Register all Helpers */

_.each(Helpers, function (helper, key) {
	Handlebars.registerHelper(key, helper);
});




