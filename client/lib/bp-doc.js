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
	safeStr,
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

	const content = [
		{ 
			style: styles.header,
			row: [
				{ text: 'Product', style: styles.label.large },
				{ text: 'Name' },
				{ text: product.name },
				{ text: 'ProductID' },
				{ text: product.product_id },
			]
		},
		{
			style: styles.data,
			row: [
				{ text: 'State' },
				{ text: ''}
				]
		}
	];





	return json2Table(bpData);
};	


module.exports = { bpDoc };