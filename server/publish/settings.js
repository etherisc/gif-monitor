Meteor.publish("setting_list", function() {
	return Settings.find({}, {});
});

Meteor.publish("settings_null", function() {
	return Settings.find({_id:null}, {});
});

Meteor.publish("setting", function(settingId) {
	return Settings.find({_id:settingId}, {});
});

Meteor.publish("setting_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Settings.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("setting_list_paged_count", function(extraOptions) {
	Counts.publish(this, "setting_list_paged_count", Settings.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"settingListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Settings.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

