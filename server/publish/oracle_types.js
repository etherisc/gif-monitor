Meteor.publish("oracle_type_list", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return OracleTypes.find({}, {});
	}
	return OracleTypes.find({createdBy:this.userId}, {});
});

Meteor.publish("oracle_type", function(oracleTypeId) {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return OracleTypes.find({_id:oracleTypeId}, {});
	}
	return OracleTypes.find({_id:oracleTypeId,createdBy:this.userId}, {});
});

Meteor.publish("oracle_type_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return OracleTypes.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
	}
	return OracleTypes.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("oracle_type_list_paged_count", function(extraOptions) {
	Counts.publish(this, "oracle_type_list_paged_count", OracleTypes.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"oracleTypeListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","user"])) {
			var data = OracleTypes.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = OracleTypes.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

