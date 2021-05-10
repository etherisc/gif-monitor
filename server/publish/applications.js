Meteor.publish("application_list", function() {
	return Applications.find({}, {});
});

Meteor.publish("application", function(applicationId) {
	return Applications.find({_id:applicationId}, {});
});

Meteor.publish("app_s_list", function() {
	return Applications.find({}, {});
});

Meteor.publish("app_s", function(appSId) {
	return Applications.find({_id:appSId}, {});
});

Meteor.publish("application_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Applications.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("application_list_paged_count", function(extraOptions) {
	Counts.publish(this, "application_list_paged_count", Applications.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"applicationListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Applications.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

