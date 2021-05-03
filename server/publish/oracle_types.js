Meteor.publish("oracle_type_list", function() {
	return OracleTypes.find({}, {});
});

Meteor.publish("oracle_type", function(oracleTypeId) {
	return OracleTypes.find({_id:oracleTypeId}, {});
});

Meteor.publish("oracle_type_list1", function() {
	return OracleTypes.find({}, {});
});

Meteor.publish("oracle_type1", function(oracleTypeId) {
	return OracleTypes.find({_id:oracleTypeId}, {});
});

Meteor.publish("oracle_type_list1_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return OracleTypes.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("oracle_type_list1_paged_count", function(extraOptions) {
	Counts.publish(this, "oracle_type_list1_paged_count", OracleTypes.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"oracleTypeList1PagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = OracleTypes.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("oracle_type_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return OracleTypes.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("oracle_type_list_paged_count", function(extraOptions) {
	Counts.publish(this, "oracle_type_list_paged_count", OracleTypes.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"oracleTypeListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = OracleTypes.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

