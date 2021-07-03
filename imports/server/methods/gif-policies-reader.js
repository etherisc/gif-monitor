/* GIF Policies Reader */

console.log('loading gif-policies-reader.js');

/*
 *
 *	Policies
 *
 */


const sanitizeData = (data) => {

	const keys = Object.keys(data).filter((key) => isNaN(key));
	let sanitized = {};
	keys.forEach(key => sanitized[key] = data[key]);
	return sanitized;

}

const safeExec = (name, body) => {
	return (async () => {
		try {
			console.log(arguments);
			return await body.apply(arguments);
		} catch ({message, stack}) {
			error(`Error in ${name}`, {message, stack});
			return null;
		}
	});
};

const getBpKeyCount = safeExec('getBpKeyCount', async () => {

	const policyStorage = getContract('Policy');
	const count = (await policyStorage.callStatic.getBpKeyCount()).toNumber();
	return count;

});

const getPolicies = safeExec('getPolicies', async () => {

	const policyStorage = getContract('Policy');
	const count = await getBpKeyCount();
	let bpKeys = [];

	for (let bpKeyIdx = 0; bpKeyIdx < count; bpKeyIdx++) {
		const bpKey = await policyStorage.bpKeys(bpKeyIdx);
		await getSingleMeta(bpKey);
	};

});


const getSingleMeta = safeExec('getSingleMeta', async (bpKey) => {

	console.log(bpKey);
	const policyStorage = getContract('Policy');
	const data = Object.assign({}, await policyStorage.metadata(bpKey));
	info(`Found Metadata ${bpKey}`, data);
	Metadata.upsert({bpKey}, {$set: {
		bp_key: b32s(bpKey),
		product_id: data.productId.toNumber(),
		claims_count: data.claimsCount.toNumber(),
		payouts_count: data.payoutsCount.toNumber(),
		has_policy: data.hasPolicy,
		has_application: data.hasApplication,
		token_contract: data.tokenContract,
		registry_contract: data.registryContract,
		release: data.release.toNumber(),
		state: data.state,
		created_at: unix2Date(data.createdAt),
		updated_at: unix2Date(data.updatedAt)			
	}})

	if (data.hasApplication) await getSingleApplication(bpKey);
	if (data.hasPolicy) await getSinglePolicy(bpKey);

});


const getSingleApplication = safeExec('getSingleApplication', async (bpKey, idx) => {
	const data = Object.assign({}, await policyStorage.application(bpKey));
	info(`Found Application ${bpKey}`, data);
	Applications.upsert({bpKey}, {$set: {
		bp_key: b32s(bpKey),
		state: data.state,
		created_at: unix2Date(data.createdAt),
		updated_at: unix2Date(data.updatedAt)			
	}})
});


const getSinglePolicy = safeExec('getSinglePolicy', async (bpKey, idx) => {
	const data = Object.assign({}, await policyStorage.application(bpKey));
	info(`Found Application ${bpKey}`, data);
	Policies.upsert({bpKey}, {$set: {
		bp_key: b32s(bpKey),
		state: data.state,
		created_at: unix2Date(data.createdAt),
		updated_at: unix2Date(data.updatedAt)			
	}})
});


module.exports = { 

	getBpKeyCount,
	getPolicies,
	getSingleMeta,
	getSingleApplication,
	getSinglePolicy

};

