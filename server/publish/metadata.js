Meteor.publish("metadata_single_list", function() {
	return Metadata.find({}, {});
});

Meteor.publish("metadata_single", function(metadataSingleId) {
	return Metadata.find({_id:metadataSingleId}, {});
});

Meteor.publish("metadata_single_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Metadata.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("metadata_single_list_paged_count", function(extraOptions) {
	Counts.publish(this, "metadata_single_list_paged_count", Metadata.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"metadataSingleListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Metadata.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

