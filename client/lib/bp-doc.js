console.log('loading bp-doc.js');

import utils from '/client/lib/utils.js';

const bpDoc = (val, doc) => {
	const bpData = ReactiveMethod.call('bpData', doc.bp_key);
	if (!bpData) return '';

	const { product, meta, application, policy, claims } = bpData;

	const label = (text, colspan) => ({ text, colspan, class: 'bpdoc-label-small' });
	const labelLarge = (text, colspan) => ({ text, colspan, class: 'bpdoc-label-large' });
	const valueText = (text, colspan) => ({ text, colspan });
	const valueBool = (val, colspan) => ({ text: val ? "Yes" : "No", colspan });
	const valueDate = (date, colspan) => ({ text: moment(date).format('DD.MM.YYYY'), colspan });
	const valueAddress = (address, colspan) => ({ text: utils.txLink(address), colspan });
	const empty = (colspan) => ({ text: '&nbsp;', class: 'bpdoc-empty-cell', colspan });
	const spacerRow = () => ({ class: 'bpdoc-row-spacer', cells: [ empty(6) ] });

	let content = [
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
				valueText(utils.productState(product.state), 3),
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
		{
			class: 'bpdoc-row-data',
			cells: [
				empty(2),
				label('BP Key'),
				valueText(meta.bp_key, 3),
			]
		},
		{
			class: 'bpdoc-row-data',
			cells: [
				empty(2),
				label('Has Policy'),
				valueBool(meta.has_policy),
				label('Has Application'),
				valueBool(meta.has_policy),
			]
		},
		{
			class: 'bpdoc-row-data',
			cells: [
				empty(2),
				label('# Claims'),
				valueText(meta.claims_count),
				label('# Payouts'),
				valueText(meta.payouts_count),
			]
		},
	];

	if (meta.has_application) {
		content = content.concat([
			spacerRow(),
			{
				class: 'bpdoc-row-header',
				cells: [
					labelLarge('Application', 2),
					label('Created'),
					valueDate(meta.created_at),
					label('Updated'),
					valueDate(meta.updated_at),
				]
			},
			{
				class: 'bpdoc-row-data',
				cells: [
					empty(2),
					label('State'),
					valueText(utils.applicationState(application.state), 3),
				]
			},
			{
				class: 'bpdoc-row-data',
				cells: [
					empty(2),
					label('Data'),
					valueText(application.data, 3),
				]
			},
		]);
	}

	if (meta.has_policy) {
		content = content.concat([
			spacerRow(),
			{
				class: 'bpdoc-row-header',
				cells: [
					labelLarge('Policy', 2),
					label('Created'),
					valueDate(meta.created_at),
					label('Updated'),
					valueDate(meta.updated_at),
				]
			},
			{
				class: 'bpdoc-row-data',
				cells: [
					empty(2),
					label('State'),
					valueText(utils.policyState(policy.state), 3),
				]
			},
		]);
	}

	if (meta.claims_count > 0) {

		const claimsContent = (claim, idx) => {
			const claimContent = [
				spacerRow(),
				{
					class: 'bpdoc-row-header',
					cells: [
						labelLarge(`Claim #${idx+1}`, 2),
						label('Created'),
						valueDate(claim.created_at),
						label('Updated'),
						valueDate(claim.updated_at),
					]
				},
				{
					class: 'bpdoc-row-data',
					cells: [
						empty(2),
						label('State'),
						valueText(utils.claimState(claim.state), 3),
					]
				},
				{
					class: 'bpdoc-row-data',
					cells: [
						empty(2),
						label('Data'),
						valueText(claim.data, 3),
					]
				},
			];

			content = content.concat(claimContent);

			if (claim.payouts.length > 0) {

				const payoutsContent = (payout, idx) => {
					const payoutContent = [
						spacerRow(),
						{
							class: 'bpdoc-row-header',
							cells: [
								empty(1),
								labelLarge(`Payout #${idx+1}`),
								label('Created'),
								valueDate(claim.created_at),
								label('Updated'),
								valueDate(claim.updated_at),
							]
						},
						{
							class: 'bpdoc-row-data',
							cells: [
								empty(2),
								label('State'),
								valueText(utils.payoutState(payout.state), 3),
							]
						},
						{
							class: 'bpdoc-row-data',
							cells: [
								empty(2),
								label('Data'),
								valueText(payout.data, 3),
							]
						},

					];
					content =content.concat(payoutContent);
				}

				claim.payouts.map(payoutsContent);
			}

		};

		claims.map(claimsContent);
	}

	const compile = (content) => {
		const rows = content.map(row => {
			const cells = row.cells.map(
				cell => `<td ${cell.colspan ? `colspan=${cell.colspan}` : ''} ${cell.class ? `class="${cell.class}"` : ''}>${cell.text}</td>`
			);
			return `<tr class="${row.class}">${cells.join("\n")}</tr>`;
		});

		const table = `<table class="bpdoc-table">\n${rows.join("\n")}\n</table>`;
		return utils.safeStr(table);
	}

	return compile(content);
};	


module.exports = { bpDoc };