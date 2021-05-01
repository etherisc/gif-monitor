Meteor.publish("contract_list", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Contracts.publishJoinedCursors(Contracts.find({}, {}));
	}
	return Contracts.publishJoinedCursors(Contracts.find({createdBy:this.userId}, {}));
});

Meteor.publish("contracts_null", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Contracts.publishJoinedCursors(Contracts.find({_id:null}, {}));
	}
	return Contracts.publishJoinedCursors(Contracts.find({_id:null,createdBy:this.userId}, {}));
});

Meteor.publish("contract", function(contractId) {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Contracts.publishJoinedCursors(Contracts.find({_id:contractId}, {}));
	}
	return Contracts.publishJoinedCursors(Contracts.find({_id:contractId,createdBy:this.userId}, {}));
});

Meteor.publish("contract_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Contracts.publishJoinedCursors(Contracts.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
	}
	return Contracts.publishJoinedCursors(Contracts.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("contract_list_paged_count", function(extraOptions) {
	Counts.publish(this, "contract_list_paged_count", Contracts.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"contractListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","user"])) {
			var data = Contracts.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Contracts.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

