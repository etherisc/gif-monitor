/* GIF Policies Reader */

console.log('loading gif-policies-reader.js');

const ethers = require('ethers');
const abiDecoder = require('abi-decoder');



const reloadSinglePolicy = async function (args) {

	try {
		const Policy = await getContract('Policy');
		const { policyId } = args;
		const policy = await Policy.policies(policyId);

		info(`Found policy ${policyId}`, { policy });

		Policies.upsert({policy_id: policyId}, {$set: {
			policy_id: policyId,
			state: policy.state,
			metadata_id: policy.metadataId,
			state_message: b32s(policy.stateMessage),
			created_at: unix2Date(policy.createdAt),
			updated_at: unix2Date(policy.updatedAt)			
		}})
	} catch (err) {
		error(`Error ReloadSinglePolicy, ${err.message}`);
	}
}

const loadPolicies = async() => {

	try {		
		const Policy = await getContract('Policy');
		const policyIdIncrement = await Policy.policyIdIncrement();

		info(`Policy: ${policyIdIncrement} policies found`);

		for (var policyId = 1; policyId <= policyIdIncrement; policyId += 1) {
			await reloadSinglePolicy({policyId });
		}
	} catch (err) {
		error(`Error loadPolicies, ${err.message}`);
	}

};

const reloadPolicies = () => {

	Policies.remove({});
	loadPolicies();

}

module.exports = { loadPolicies, reloadPolicies, reloadSinglePolicy };

