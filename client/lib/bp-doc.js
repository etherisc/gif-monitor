console.log('loading bp-doc.js');

import utils from '/client/lib/utils.js';

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
	const valueText = (text, colspan) => { text, colspan };
	const valueDate = (date, colspan) => { text: moment(date).format('DD.MM.YYYY'), colspan };
	const valueAddress = (address, colspan) => { utils.txLink(address), colspan };
	const empty = (colspan) => ({ colspan });
	const emptyRow = () => ({ style: styles.empty, row: [ empty(6) ] });

	const content = [
		{ 
			style: styles.header,
			row: [
				labelLarge('Product'),
				label('Name'),
				valueText(product.name),
				label('ProductID'),
				valueText(product.product_id),
			]
		},
		{
			style: styles.data,
			row: [
				empty(2),
				label('State'),
				valueText(utils.stateMessage.product[product.state], 3),
			]
		},
		{
			style: styles.data,
			row: [
				empty(2),
				label('Release'),
				valueText(product.release),
				label('PolicyFlow'),
				valueText(product.policy_flow),
			]
		},
		{
			style: styles.data,
			row: [
				empty(2),
				label('Owner'),
				valueAddress(product.owner, 3),
			]
		},
		{
			style: styles.data,
			row: [ 
				empty(2),
				label('Address'),
				valueAddress(product.address, 3),
			]
		},
		emptyRow(),
		{
			style: styles.header,
			row: [
				labelLarge('Metadata'),
				label('Created'),
				valueDate(meta.created_at),
				label('Updated'),
				valueDate(meta.updated_at),
				]
		},
	];

	return json2Table(bpData);
};	


module.exports = { bpDoc };