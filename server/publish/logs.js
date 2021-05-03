Meteor.publish("logline_list", function() {
	return Logs.find({}, {});
});

Meteor.publish("logline", function(loglineId) {
	return Logs.find({_id:loglineId}, {});
});

Meteor.publish("logline_list_analytics", function() {
	return Logs.find({source:"analytics"}, {sort:{timestamp:-1}});
});

Meteor.publish("logline_list_server", function() {
	return Logs.find({source:"server"}, {sort:{timestamp:-1}});
});

Meteor.publish("logline_list_browser", function() {
	return Logs.find({source:"browser"}, {sort:{timestamp:-1}});
});

Meteor.publish("logline_list_browser_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Logs.find(databaseUtils.extendFilter({source:"browser"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
});

Meteor.publish("logline_list_browser_paged_count", function(extraOptions) {
	Counts.publish(this, "logline_list_browser_paged_count", Logs.find(databaseUtils.extendFilter({source:"browser"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"loglineListBrowserPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Logs.find(databaseUtils.extendFilter({source:"browser"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("logline_list_analytics_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Logs.find(databaseUtils.extendFilter({source:"analytics"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
});

Meteor.publish("logline_list_analytics_paged_count", function(extraOptions) {
	Counts.publish(this, "logline_list_analytics_paged_count", Logs.find(databaseUtils.extendFilter({source:"analytics"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"loglineListAnalyticsPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Logs.find(databaseUtils.extendFilter({source:"analytics"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("logline_list_server_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Logs.find(databaseUtils.extendFilter({source:"server"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
});

Meteor.publish("logline_list_server_paged_count", function(extraOptions) {
	Counts.publish(this, "logline_list_server_paged_count", Logs.find(databaseUtils.extendFilter({source:"server"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"loglineListServerPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Logs.find(databaseUtils.extendFilter({source:"server"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

