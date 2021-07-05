Meteor.publish("payout_list", function() {
	return Payouts.find({}, {sort:{updated_at:-1}});
});

Meteor.publish("payout", function(payoutId) {
	return Payouts.find({_id:payoutId}, {});
});

Meteor.publish("payout_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Payouts.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{updated_at:-1}}, extraOptions));
});

Meteor.publish("payout_list_paged_count", function(extraOptions) {
	Counts.publish(this, "payout_list_paged_count", Payouts.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"payoutListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Payouts.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{updated_at:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

