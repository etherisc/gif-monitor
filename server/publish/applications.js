Meteor.publish("application_list", function() {
	return Applications.find({}, {sort:{updated_at:-1}});
});

Meteor.publish("application", function(applicationId) {
	return Applications.find({_id:applicationId}, {});
});

Meteor.publish("application_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Applications.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{updated_at:-1}}, extraOptions));
});

Meteor.publish("application_list_paged_count", function(extraOptions) {
	Counts.publish(this, "application_list_paged_count", Applications.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"applicationListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Applications.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{updated_at:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

