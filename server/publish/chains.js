Meteor.publish("chain_list", function() {
	return Chains.find({}, {sort:["name","asc"]});
});

Meteor.publish("chain_list1", function() {
	return Chains.find({}, {});
});

Meteor.publish("chains_null", function() {
	return Chains.find({_id:null}, {});
});

Meteor.publish("chain", function(chainId) {
	return Chains.find({_id:chainId}, {});
});

Meteor.publish("chain_list1_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Chains.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("chain_list1_paged_count", function(extraOptions) {
	Counts.publish(this, "chain_list1_paged_count", Chains.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"chainList1PagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Chains.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

