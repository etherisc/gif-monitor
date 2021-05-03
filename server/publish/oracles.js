Meteor.publish("oracle_list", function() {
	return Oracles.find({}, {});
});

Meteor.publish("oracle", function(oracleId) {
	return Oracles.find({_id:oracleId}, {});
});

Meteor.publish("oracle_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Oracles.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("oracle_list_paged_count", function(extraOptions) {
	Counts.publish(this, "oracle_list_paged_count", Oracles.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"oracleListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Oracles.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

