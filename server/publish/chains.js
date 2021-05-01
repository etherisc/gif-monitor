Meteor.publish("chain_list", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Chains.find({}, {sort:["name","asc"]});
	}
	return Chains.find({createdBy:this.userId}, {sort:["name","asc"]});
});

Meteor.publish("chain_list1", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Chains.find({}, {});
	}
	return Chains.find({createdBy:this.userId}, {});
});

Meteor.publish("chains_null", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Chains.find({_id:null}, {});
	}
	return Chains.find({_id:null,createdBy:this.userId}, {});
});

Meteor.publish("chain", function(chainId) {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Chains.find({_id:chainId}, {});
	}
	return Chains.find({_id:chainId,createdBy:this.userId}, {});
});

Meteor.publish("chain_list1_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Chains.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
	}
	return Chains.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("chain_list1_paged_count", function(extraOptions) {
	Counts.publish(this, "chain_list1_paged_count", Chains.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"chainList1PagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","user"])) {
			var data = Chains.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Chains.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

