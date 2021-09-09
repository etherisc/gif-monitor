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

const b32s = (b32) => ethers.utils.parseBytes32String(b32);
const s32b = (text) => ethers.utils.formatBytes32String(text.slice(0,31));

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


const blockExplorer = () => ReactiveMethod.call('blockExplorer');
const ipfsGateway = () => ReactiveMethod.call('ipfsGateway');
const safeStr = (str) => new Handlebars.SafeString(str ? str : '');
const pre = (text) => safeStr(`<pre class="code">${text}</pre>`);
const ipfsLinkHtml = (ipfs, text) => `<a href="${ipfsGateway()}/ipfs/${ipfs.ipfs}" target="_blank">${text ? text : `/ipfs/${ipfs.ipfs}`}</a>`;
const ipfsLink = (ipfs) => safeStr(ipfsLinkHtml(ipfs));
const txLinkHtml = (txHash) => `<a href="${blockExplorer()}/tx/${txHash}" target="_blank">${txHash.slice(0,10)}...</a>`;
const txLink = (txHash) => safeStr(txLinkHtml(txHash));
const addressLongLinkHtml = (address, text) => `<a href="${blockExplorer()}/address/${address}" target="_blank">${text ? text : address}</a>`;
const addressLongLink = (address) => safeStr(addressLongLinkHtml(address));
const addressLinkHtml = (address) => address ? addressLongLinkHtml(address, address.slice(0,10)) : "n/a";
const addressLink = (address) => safeStr(addressLinkHtml(address));


const mapHeader = (key) => {

	const dict = {
		"name": "Name",
		"oracleTypeName": "Oracle Type",
		"oracleName": "Oracle Name",
		"oracleDescription": "Oracle",
		"oracleId": "Oracle Id",
		"assignmentState": "State",
		"transaction_no": "hidden",
		"internalType": "hidden",
		"indexed": "hidden",
		"compiler": "Compiler",
		"output": "hidden",
		"language": "Language",
		"settings": "Settings",
		"version": "Version",
		"sources": "Sources"
	}; 
	return dict[key] === 'hidden' ? null : (dict[key] ? dict[key] : key);
};

const mapVal = (key, val, data) => {

	switch (key) {
		case "assignmentState": 
			return oracleAssignmentState(val);
			
		case "compiler":
			return `Version: ${val.version}`;
		
		case "settings": 
			return `Target: ${Object.keys(val.compilationTarget)[0]}<br />
					EVM: ${val.evmVersion}<br />
					Optimizer: Enabled: ${val.optimizer.enabled} / Runs: ${val.optimizer.runs}`;
					
		case "sources":
			const sourceFiles = Object.keys(val);
			const link = (sf) => {
				const urls = val[sf].urls;
				const iLink = urls.find((url) => url.startsWith('dweb:')).slice(11);
				return {ipfs: iLink};
			};
			return sourceFiles.map((sf) => `${ipfsLinkHtml(link(sf), sf)} - License: ${val[sf].license}`).join('<br />');
		
		case "link":
			return ipfsLinkHtml(val);
			
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

const header2Html = (headers) => `<thead><tr>${headers.map((key) => mapHeader(key) ? `<th>${mapHeader(key)}</th>` : '').join('')}</tr></thead>`
const row2Html = (headers, row) => `<tr>${headers.map((key) => mapHeader(key) ? `<td>${mapVal(key, row[key])}</td>` : '').join('')}</tr>`;

const array2TableHtml = (arrVal) => {
	try {
		if (!arrVal || !Array.isArray(arrVal)) return '';
		const headers = Object.keys(arrVal[0]);
		const header = header2Html(headers);
		const body = arrVal.map((row) => row2Html(headers, row)).join('\n');
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


const meta2Table = (meta) => {

	const headers = Object.keys(meta);    
	const rows = headers.map((key) => mapHeader(key) ? `<tr><td>${mapHeader(key)}</td><td>${mapVal(key, meta[key])}</td></tr>` : '')
	const html = `<table class="custom-param-table">
<tbody>
${rows.join('\n')}
</tbody> 
</table>`;
	
	return new Handlebars.SafeString(html);

};

const oracleItems = new ReactiveVar([]); // used both for oracles and oracleTypes since only used on different pages

const assignedOracles = (val, oracleType) => {

	if (!oracleType) return '';
	Meteor.call('getAssignedOracles', oracleType.name, (err, res) => {
		if (err) {
			throw new Meteor.Error(err.message);
		} else {
			oracleItems.set(res);
		};
	});
	return array2Table(oracleItems.get());
};

const assignedOracleTypes = (val, oracle) => {
	if (!oracle) return '';
	Meteor.call('getAssignedOracleTypes', oracle.oracle_id, (err, res) => {
		if (err) {
			throw new Meteor.Error(err.message);
		} else {
			oracleItems.set(res);
		};
	});
	return array2Table(oracleItems.get());
};

const ipfsJson = new ReactiveVar({});
const ipfsJsonView = (ipfs) => {
	const old = ipfsJson.get();
	const gateway = ipfsGateway();
	if (!gateway) return '';
	fetch(`${gateway}/ipfs/${ipfs.ipfs}`)
	.then(response => response.json())
	.then(json => 
		json.link = ipfs;
		console.log(json);
		if (JSON.stringify(old) != JSON.stringify(json)) ipfsJson.set(json); 
	})
	.catch((err) => console.log(ipfs, err));
	return meta2Table(ipfsJson.get());
};


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
	hasRevokableOracleTypes,
	ipfsJsonView
};

