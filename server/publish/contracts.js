Meteor.publish("contract_list", function() {
	return Contracts.publishJoinedCursors(Contracts.find({}, {}));
});

Meteor.publish("contracts_null", function() {
	return Contracts.publishJoinedCursors(Contracts.find({_id:null}, {}));
});

Meteor.publish("contract", function(contractId) {
	return Contracts.publishJoinedCursors(Contracts.find({_id:contractId}, {}));
});

Meteor.publish("contract_list1", function() {
	return Contracts.publishJoinedCursors(Contracts.find({}, {}));
});

Meteor.publish("contract1", function(contractId) {
	return Contracts.publishJoinedCursors(Contracts.find({_id:contractId}, {}));
});

Meteor.publish("contract_list_public", function() {
	return Contracts.publishJoinedCursors(Contracts.find({}, {}));
});

Meteor.publish("contract_public", function(contractId) {
	return Contracts.publishJoinedCursors(Contracts.find({_id:contractId}, {}));
});

Meteor.publish("contract_list_public_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Contracts.publishJoinedCursors(Contracts.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("contract_list_public_paged_count", function(extraOptions) {
	Counts.publish(this, "contract_list_public_paged_count", Contracts.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"contractListPublicPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Contracts.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("contract_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Contracts.publishJoinedCursors(Contracts.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)));
});

Meteor.publish("contract_list_paged_count", function(extraOptions) {
	Counts.publish(this, "contract_list_paged_count", Contracts.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"contractListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Contracts.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

