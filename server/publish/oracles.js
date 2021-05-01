Meteor.publish("oracle_list", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Oracles.find({}, {});
	}
	return Oracles.find({createdBy:this.userId}, {});
});

Meteor.publish("oracle", function(oracleId) {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Oracles.find({_id:oracleId}, {});
	}
	return Oracles.find({_id:oracleId,createdBy:this.userId}, {});
});

Meteor.publish("oracle_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Oracles.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
	}
	return Oracles.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("oracle_list_paged_count", function(extraOptions) {
	Counts.publish(this, "oracle_list_paged_count", Oracles.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"oracleListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","user"])) {
			var data = Oracles.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Oracles.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

