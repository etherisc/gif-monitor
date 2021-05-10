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


const reloadSingleItem = async function (config, id) {

	try {
		const data = sanitizeData(await config.storage[config.collection](id));
		info(`Found ${config.collection} item ${id}`, data);
		config.upsert(id, data);

	} catch (err) {
		error(`Error ReloadSingleItem, ${err.message}`, {message: err.message, stack: err.stack});
	}
}

const loadItems = async function (config) {

	try {		
		const count = await config.storage[config.increment]();

		info(`${config.collection}: ${count} items found`);

		for (var id = 1; id <= count; id += 1) {
			await reloadSingleItem(config, id );
		}
	} catch (err) {
		error(`Error loading ${config.collection}, ${err.message}`, {message: err.message, stack: err.stack});
	}

};


const configs = {
	metadata: {
		collection: "getMetadata",
		increment: "metadataIdIncrement",
		storage: getContract('Policy'),
		upsert: (id, data) => {
			Metadata.upsert({metadata_id: id}, {$set: {
				metadata_id: id,
				product_id: data.productId.toNumber(),
				application_id: data.applicationId.toNumber(),
				policy_id: data.policyId.toNumber(),
				claim_ids: data.claimIds.map(item => item.toNumber()),
				payout_ids: data.payoutIds.map(item => item.toNumber()),
				has_policy: data.hasPolicy,
				has_application: data.hasApplication,
				token_contract: data.tokenContract,
				registry_contract: data.registryContract,
				release: data.release.toNumber(),
				state: data.state,
				state_message: b32s(data.stateMessage),
				bp_external_key: data.bpExternalKey,
				created_at: unix2Date(data.createdAt),
				updated_at: unix2Date(data.updatedAt)			
			}})
		}
	},
	applications: {
		collection: "getApplication",
		increment: "applicationIdIncrement",
		storage: getContract('Policy'),
		upsert: (id, data) => {
			Applications.upsert({application_id: id}, {$set: {
				application_id: id,
				metadata_id: data.metadataId.toNumber(),
				premium: toEther(data.premium),
				currency: b32s(data.currency),
				payout_options: data.payoutOptions.map(item => item.toNumber()),
				state: data.state,
				state_message: b32s(data.stateMessage),
				created_at: unix2Date(data.createdAt),
				updated_at: unix2Date(data.updatedAt)			
			}})
		}
	},
	policies: {
		collection: "policies",
		increment: "policyIdIncrement",
		storage: getContract('Policy'),
		upsert: (id, data) => {
			Policies.upsert({policy_id: id}, {$set: {
				policy_id: id,
				state: data.state,
				metadata_id: data.metadataId.toNumber(),
				state_message: b32s(data.stateMessage),
				created_at: unix2Date(data.createdAt),
				updated_at: unix2Date(data.updatedAt)			
			}})
		}
	},
}

const reloadApplications = async () => {

	Applications.remove({});
	await loadItems(configs.applications);
}

const reloadPolicies = async () => {

	Policies.remove({});
	await loadItems(configs.policies);
}

const reloadMetadata = async () => {

	Metadata.remove({});
	await loadItems(configs.metadata);
}

const loadApplications = () => loadItems(configs.applications);
const loadPolicies = () => loadItems(configs.policies);
const loadMetadata = () => loadItems(configs.metadata);
const reloadSingleApplication = (id) => reloadSingleItem(configs.applications, id);
const reloadSinglePolicy = (id) => reloadSingleItem(configs.policies, id);
const reloadSingleMetadata = (id) => reloadSingleItem(configs.metadata, id);

module.exports = { 
	
	loadApplications,
	reloadApplications, 
	reloadSingleApplication,
	
	loadPolicies, 
	reloadPolicies, 
	reloadSinglePolicy,
	
	loadMetadata,
	reloadMetadata,
	reloadSingleMetadata
	
};

