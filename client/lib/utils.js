console.log('loading utils.js');

import { ethers } from 'ethers';


/*******************
 * Globals 
 *******************/

userIsAdmin = () => {
	var user = Meteor.user();
	if(!user || !user.roles) {
		return false;
	}
	return user.roles.indexOf("admin") >= 0;
};


/*******************/

const b32s = (b32) => {
	return ethers.utils.parseBytes32String(b32);
}

const s32b = (text) => {
	return ethers.utils.formatBytes32String(text.slice(0,31))
}

const stateMessage = {

	product: [ 'Proposed', 'Approved', 'Paused' ],
	oracle: [ 'Proposed', 'Approved', 'Paused' ],
	oracleType: [ 'Uninitialized', 'Proposed', 'Approved'],
	oracleAssignment: [ 'Unassigned', 'Proposed', 'Assigned' ],
	policy: [ 'Active', 'Expired' ],
	claim: [ 'Applied', 'Confirmed', 'Declined' ],
	application: [ 'Applied', 'Revoked', 'Underwritten', 'Declined' ],
	policyFlow: [ 'Started', 'Paused', 'Finished' ],
	payout: [ 'Expected', 'PaidOut' ]
};

const productState = (state) => stateMessage.product[state];
const oracleState = (state) => stateMessage.oracle[state];
const oracleTypeState = (state) => stateMessage.oracleType[state];
const oracleAssignmentState = (state) => stateMessage.oracleAssignment[state];
const policyState = (state) => stateMessage.policy[state];
const applicationState = (state) => stateMessage.application[state];
const claimState = (state) => stateMessage.claim[state];
const policyFlowState = (state) => stateMessage.policyFlow[state];
const payoutState = (state) => stateMessage.payout[state];
const isProductState = (state, data) => stateMessage.product[data.product.state] === state;
const isOracleTypeApproved = (data) => data.oracle_type.state === 2;
const isOracleApproved = (data) => data && data.oracle ? data.oracle.state === 1 : false;
const hasAssignableOracles = (data) => {
	return (data.oracle_type.assigned_oracles.filter(item => item.assignmentState === 1).length > 0);
};
const hasRevokableOracleTypes = (data) => {
	return (data.oracle.active_oracle_types > 0);
};

const mapHeader = (key) => {

	const dict = {
		"name": "Name",
		"oracleTypeName": "Oracle Type",
		"oracleDescription": "Oracle",
		"oracleId": "Oracle Id",
		"assignmentState": "State",
		"transaction_no": "hidden",
		"internalType": "hidden",
		"indexed": "hidden"
	}; 
	return dict[key] === 'hidden' ? null : (dict[key] ? dict[key] : key);
};

const mapVal = (key, val, data) => {

	switch (key) {
		case "assignmentState": 
			return oracleAssignmentState(val);

		default: return val;

	}
};


const json2TableHtml = function(value, data) {
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
	return table;
};

const json2Table = (value, data) => new Handlebars.SafeString(json2TableHtml(value, data));

const array2TableHtml = (arrVal) => {
	try {
		if (!arrVal || !Array.isArray(arrVal)) return '';
		const headers = Object.keys(arrVal[0]);
		const header = `<thead><tr>${headers.map((key) => mapHeader(key) ? `<th>${mapHeader(key)}</th>` : '').join('')}</tr></thead>`;
		const body = arrVal.map((row) => `<tr>${headers.map((key) => mapHeader(key) ? `<td>${mapVal(key, row[key])}</td>` : '').join('')}</tr>`).join('\n');
		return `<table class="custom-param-table">${header}${body}</table>`;
	} catch (err) {
		return '';
	}
};

const array2Table = (arrVal) => new Handlebars.SafeString(array2TableHtml(arrVal));

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

const abi2Table = (abi) => {
	const tbl = abi.map(abiSingle).join('<br />');
	return new Handlebars.SafeString(`<pre>${tbl}</pre>`);
};


const assignedOracles = async (val, oracleType) => {
	if (!oracleType) return '';
	const items = await new Promise((resolve, reject) => {
		Meteor.call('getAssignedOracles', oracleType.name, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			});
		});
	return array2Table(items);
};
	
const assignedOracleTypes = async (val, oracle) => {
	if (!oracle) return '';
	const items = await new Promise((resolve, reject) => {
		Meteor.call('getAssignedOracleTypes', oracle.oracle_id, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			});
		});
	return array2Table(items);
};
	

const blockExplorer = () => ReactiveMethod.call('blockExplorer');
const ipfsGateway = () => ReactiveMethod.call('ipfsGateway');
const safeStr = (str) => new Handlebars.SafeString(str ? str : '');
const pre = (text) => safeStr(`<pre class="code">${text}</pre>`);
const ipfsLinkHtml = (ipfs) => `<a href="${ipfsGateway()}/ipfs/${ipfs.ipfs}" target="_blank">/ipfs/${ipfs.ipfs}</a>`;
const ipfsLink = (ipfs) => safeStr(ipfsLinkHtml(ipfs));
const txLinkHtml = (txHash) => `<a href="${blockExplorer()}/tx/${txHash}" target="_blank">${txHash.slice(0,10)}...</a>`;
const txLink = (txHash) => safeStr(txLinkHtml(txHash));
const addressLongLinkHtml = (address, text) => `<a href="${blockExplorer()}/address/${address}" target="_blank">${text ? text : address}</a>`;
const addressLongLink = (address) => safeStr(addressLongLinkHtml(address));
const addressLinkHtml = (address) => addressLongLinkHtml(address, address.slice(0,10));
const addressLink = (address) => safeStr(addressLinkHtml(address));

module.exports = {
	b32s,
	s32b,
	stateMessage,
	mapHeader,
	mapVal,
	json2TableHtml,
	json2Table,
	array2TableHtml,
	array2Table,
	abi2Table,
	assignedOracles,
	assignedOracleTypes,
	pre,
	safeStr,
	ipfsLink,
	txLink,
	addressLink,
	addressLongLink,
	blockExplorer,
	ipfsGateway,
	stateMessage,
	productState,
	oracleState,
	oracleTypeState,
	oracleAssignmentState,
	policyState,
	applicationState,
	claimState,
	policyFlowState,
	payoutState,
	isProductState,
	isOracleTypeApproved,
	isOracleApproved,
	hasAssignableOracles,
	hasRevokableOracleTypes
};

