Meteor.publish("metadata_list", function() {
	return Metadata.find({}, {sort:{updated_at:-1}});
});

Meteor.publish("metadata", function(metadataId) {
	return Metadata.find({_id:metadataId}, {});
});

Meteor.publish("metadata_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Metadata.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{updated_at:-1}}, extraOptions));
});

Meteor.publish("metadata_list_paged_count", function(extraOptions) {
	Counts.publish(this, "metadata_list_paged_count", Metadata.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"metadataListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Metadata.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{updated_at:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

