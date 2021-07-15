console.log('loading bp-doc.js');

const bpDoc = (val, doc) => {
	const bpData = ReactiveMethod.call('bpData', doc.bp_key);

	const { product, meta, application, policy, claims } = bpData;

	console.log(bpData);
	const row = (key, val) => `<tr><td>${key}</td><td>${value}</td></tr>`;
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