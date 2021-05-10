Meteor.publish("metadata_list", function() {
	return Metadata.find({}, {});
});

Meteor.publish("metadata", function(id) {
	return Metadata.find({_id:id}, {});
});

Meteor.publish("mds_list", function() {
	return Metadata.find({}, {});
});

Meteor.publish("mds", function(mdsId) {
	return Metadata.find({_id:mdsId}, {});
});

Meteor.publish("metadata_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Metadata.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("metadata_list_paged_count", function(extraOptions) {
	Counts.publish(this, "metadata_list_paged_count", Metadata.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"metadataListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Metadata.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

