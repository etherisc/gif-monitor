Meteor.publish("claim_list", function() {
	return Claims.find({}, {sort:{updated_at:-1}});
});

Meteor.publish("claim", function(claimId) {
	return Claims.find({_id:claimId}, {});
});

Meteor.publish("claim_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Claims.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{updated_at:-1}}, extraOptions));
});

Meteor.publish("claim_list_paged_count", function(extraOptions) {
	Counts.publish(this, "claim_list_paged_count", Claims.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"claimListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Claims.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{updated_at:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

