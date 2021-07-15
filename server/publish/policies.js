Meteor.publish("policy_list", function() {
	return Policies.find({}, {sort:{updated_at:-1}});
});

Meteor.publish("policy", function(policyId) {
	return Policies.find({_id:policyId}, {});
});

