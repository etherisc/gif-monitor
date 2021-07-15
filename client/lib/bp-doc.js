console.log('loading bp-doc.js');

import {
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
	safeStr
} from '/client/lib/utils.js';

const bpDoc = (val, doc) => {
	const bpData = ReactiveMethod.call('bpData', doc.bp_key);
	if (!bpData) return '';

	const { product, meta, application, policy, claims } = bpData;

	const row = (key, val) => `<tr><td>${key}</td><td>${val}</td></tr>`;
	const tbody = [
		row('','')
	].join("\n");

	const color = {
		green: '#00ff00',
		blue: '#0000ff'
	};

	const styles = {
		header: { background: color.green },
		label: {
			large: {fontSize: 14, fontWeight: 'bold'},
			small: {}
		},
	};

	const label = (text) => ({ text, style: styles.label.small });
	const labelLarge = (text) => ({ text, style: styles.label.large });
	const value = (text, colspan) => { text, colspan };
	const empty = (colspan) => ({ colspan });

	const content = [
		{ 
			style: styles.header,
			row: [
				labelLarge('Product'),
				label('Name'),
				value(product.name),
				label('ProductID'),
				value(product.product_id),
			]
		},
		{
			style: styles.data,
			row: [
				empty(2),
				label('State'),
				value(stateMessage.product[product.state], 3),
			]
		},
		{
			style: styles.data,
			row: [
				empty(2),
				label('Release'),
				value(product.release),
				label('PolicyFlow'),
				value(product.policy_flow),
			]
		},
		{
			style: styles.data,
			row: [
				empty(2),
				label('Owner'),
				value(product.owner, 3),
			]
		},
		{
			style: styles.data,
			row: [ 
				empty(2),
				label('Address'),
				value(product.owner, 3),
			]
		},
	];

	return json2Table(bpData);
};	


module.exports = { bpDoc };