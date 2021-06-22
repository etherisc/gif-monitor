Meteor.publish("instance_list", function() {
	return Instances.find({}, {sort:["name","asc"]});
});

Meteor.publish("instances_null", function() {
	return Instances.find({_id:null}, {});
});

Meteor.publish("instance", function(chainId) {
	return Instances.find({_id:chainId}, {});
});

Meteor.publish("instance_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Instances.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:["name","asc"]}, extraOptions));
});

Meteor.publish("instance_list_paged_count", function(extraOptions) {
	Counts.publish(this, "instance_list_paged_count", Instances.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"instanceListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Instances.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:["name","asc"]}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

