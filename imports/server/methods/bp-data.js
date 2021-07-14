console.log('loading process-document.js');

// Create a process document for presentation in the Detail View



const bpData = (bp_key) => {

	
	const meta = Metadata.findOne({bp_key});
	
	if (!meta) return '';
	
	const policy = meta.has_policy ? Policies.findOne({bp_key}) : null;
	
	if (meta.has_policy && !policy) error(`Missing Policy Data ${bp_key}`);
	
	const application = meta.has_application ? Applications.findOne({bp_key}) : null;
	
	if (meta.has_application && !application) error(`Missing Application Data ${bp_key}`);
	
	let claims = Claims.find({bp_key}).fetch();
	
	if (meta.claims_count > claims.length) error(`Missing Claims ${bp_key}`, {actual: claims.length, expected: meta.claims_count});
	if (meta.claims_count < claims.length) error(`To many Claims ${bp_key}`, {actual: claims.length, expected: meta.claims_count});
	
	const payouts = Payouts.find({bp_key}).fetch();
	
	if (meta.payouts_count > payouts.length) error(`Missing Payouts ${bp_key}`, {actual: payouts.length, expected: meta.payouts_count});
	if (meta.payouts_count < payouts.length) error(`To many Payouts ${bp_key}`, {actual: payouts.length, expected: meta.payouts_count});
	
	claims = claims.map((claim, idx) => ({payouts: payouts.find(payout => payout.claim_id === idx), ... claim}));
	
	const product = Products.findOne({product_id: meta.product_id});
	
	if (!product) error(`Missing Product ${meta.product_id}`);
	
	return {meta, policy, claims, product};
}


module.exports = { bpData };