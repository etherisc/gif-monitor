Meteor.publish("policy_list", function() {
	return Policies.find({}, {});
});

Meteor.publish("policy", function(policyId) {
	return Policies.find({_id:policyId}, {});
});

Meteor.publish("pol_s_list", function() {
	return Policies.find({}, {});
});

Meteor.publish("pol_s", function(polSId) {
	return Policies.find({_id:polSId}, {});
});

Meteor.publish("policy_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Policies.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("policy_list_paged_count", function(extraOptions) {
	Counts.publish(this, "policy_list_paged_count", Policies.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"policyListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Policies.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

