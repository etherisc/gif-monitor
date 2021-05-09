Meteor.publish("payout_list", function() {
	return Payouts.find({}, {});
});

Meteor.publish("payout", function(payoutId) {
	return Payouts.find({_id:payoutId}, {});
});

Meteor.publish("payout_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Payouts.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("payout_list_paged_count", function(extraOptions) {
	Counts.publish(this, "payout_list_paged_count", Payouts.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"payoutListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Payouts.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

