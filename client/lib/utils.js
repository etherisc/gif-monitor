console.log('loading utils.js');

import { ethers } from 'ethers';

const b32s = (b32) => {
	return ethers.utils.parseBytes32String(b32);
}

const s32b = (text) => {
	return ethers.utils.formatBytes32String(text.slice(0,31))
}

const stateMessage = {
	
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

const pre = (text) => new Handlebars.SafeString(`<pre class="code">${text}</pre>`);
const safeStr = (str) => new Handlebars.SafeString(str ? str : '');

const ipfsLink = (ipfs) => safeStr(`<a href="https://gateway.pinata.cloud/ipfs/${ipfs.ipfs}" target="_blank">/ipfs/${ipfs.ipfs}</a>`);
const txLink = (txHash) => safeStr(`<a href="https://blockscout.com/xdai/mainnet/tx/${txHash}" target="_blank">${txHash.slice(0,10)}...</a>`);
const addressLink = (address) => safeStr(`<a href="https://blockscout.com/xdai/mainnet/address/${address}" target="_blank">${address.slice(0,10)}...</a>`);
const addressLongLink = (address) => safeStr(`<a href="https://blockscout.com/xdai/mainnet/address/${address}" target="_blank">${address}</a>`);

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
	pre,
	safeStr,
	ipfsLink,
	txLink,
	addressLink,
	addressLongLink,
};

