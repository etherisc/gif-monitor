console.log('loading bp-doc.js');

import utils from '/client/lib/utils.js';

const bpDoc = (val, doc) => {
	const bpData = ReactiveMethod.call('bpData', doc.bp_key);
	if (!bpData) return '';

	const { product, meta, application, policy, claims } = bpData;

	const label = (text, colspan) => ({ text, colspan, class: 'bpdoc-label-small' });
	const labelLarge = (text, colspan) => ({ text, colspan, class: 'bpdoc-label-large' });
	const valueText = (text, colspan) => ({ text, colspan });
	const valueDate = (date, colspan) => ({ text: moment(date).format('DD.MM.YYYY'), colspan });
	const valueAddress = (address, colspan) => ({ text: utils.txLink(address), colspan });
	const empty = (colspan) => ({ text: '', colspan });
	const spacerRow = () => ({ class: 'bpdoc-row-spacer', cells: [ empty(6) ] });

	const content = [
		{ 
			class: 'bpdoc-row-header',
			cells: [
				labelLarge('Product', 2),
				label('Name'),
				valueText(product.name),
				label('ProductID'),
				valueText(product.product_id),
			]
		},
		{
			class: 'bpdoc-row-data',
			cells: [
				empty(2),
				label('State'),
				valueText(utils.stateMessage.product[product.state], 3),
			]
		},
		{
			class: 'bpdoc-row-data',
			cells: [
				empty(2),
				label('Release'),
				valueText(product.release),
				label('PolicyFlow'),
				valueText(product.policy_flow),
			]
		},
		{
			class: 'bpdoc-row-data',
			cells: [
				empty(2),
				label('Owner'),
				valueAddress(product.owner, 3),
			]
		},
		{
			class: 'bpdoc-row-data',
			cells: [ 
				empty(2),
				label('Address'),
				valueAddress(product.address, 3),
			]
		},
		spacerRow(),
		{
			class: 'bpdoc-row-header',
			cells: [
				labelLarge('Metadata', 2),
				label('Created'),
				valueDate(meta.created_at),
				label('Updated'),
				valueDate(meta.updated_at),
			]
		},
	];

	const compile = (content) => {
		const rows = content.map(row => {
			console.log(row);
			const cells = row.cells.map(
				cell => `<td ${cell.colspan ? `colspan=${cell.colspan}` : ''} ${cell.class ? `class="${cell.class}"` : ''}>${cell.text}</td>`
			);
			return `<tr class="${row.class}">${cells.join()}</tr>`;
			});

		const table = `<table class="bpdoc-table">\n${rows.join("\n")}\n</table>`;
		console.log(table);
		return utils.safeStr(table);
	}

	return compile(content);
};	


module.exports = { bpDoc };