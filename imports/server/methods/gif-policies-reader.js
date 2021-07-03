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
	return (async function () {
		try {
			return await body.apply(null, arguments);
		} catch ({message, stack}) {
			error(`Error in ${name}`, {message, stack});
			return null;
		}
	});
};

const getBpKeyCount = safeExec('getBpKeyCount', async function () {

	const policyStorage = getContract('Policy');
	const count = (await policyStorage.callStatic.getBpKeyCount()).toNumber();
	return count;

});

const getPolicies = safeExec('getPolicies', async function () {

	const policyStorage = getContract('Policy');
	const count = await getBpKeyCount();
	let bpKeys = [];

	for (let bpKeyIdx = 0; bpKeyIdx < count; bpKeyIdx++) {
		const bpKey = await policyStorage.bpKeys(bpKeyIdx);
		await getSingleMetadata(bpKey);
	};

});


const getSingleMetadata = safeExec('getSingleMetadata', async function (bpKey) {

	const policyStorage = getContract('Policy');
	const data = Object.assign({}, await policyStorage.metadata(bpKey));
	const bp_key = b32s(bpKey);
	info(`Found Metadata ${bp_key}`, data);
	Metadata.upsert({bpKey}, {$set: {
		bp_key,
		product_id: data.productId.toNumber(),
		options: data.options,
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


const getSingleApplication = safeExec('getSingleApplication', async function (bpKey) {
	const policyStorage = getContract('Policy');
	const data = Object.assign({}, await policyStorage.applications(bpKey));
	const bp_key = b32s(bpKey);
	info(`Found Application ${bp_key}`, data);
	Applications.upsert({bpKey}, {$set: {
		bp_key,
		state: data.state,
		created_at: unix2Date(data.createdAt),
		updated_at: unix2Date(data.updatedAt)			
	}})
});


const getSinglePolicy = safeExec('getSinglePolicy', async function (bpKey) {
	const policyStorage = getContract('Policy');
	const data = Object.assign({}, await policyStorage.policies(bpKey));
	const bp_key = b32s(bpKey);
	info(`Found Policy ${bp_key}`, data);
	Policies.upsert({bpKey}, {$set: {
		bp_key,
		state: data.state,
		created_at: unix2Date(data.createdAt),
		updated_at: unix2Date(data.updatedAt)			
	}})
});


const reloadPolicies = safeExec('reloadPolicies', async function () {
	Metadata.remove({});
	Applications.remove({});
	Policies.remove({});
	Claims.remove({});
	Payouts.remove({});
	await getPolicies();
});

module.exports = { 

	getBpKeyCount,
	getPolicies,
	getSingleMetadata,
	getSingleApplication,
	getSinglePolicy,
	reloadPolicies

};

