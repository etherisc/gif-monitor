Meteor.publish("payout_list", function() {
	return Payouts.find({}, {sort:{updated_at:-1}});
});

Meteor.publish("payout", function(payoutId) {
	return Payouts.find({_id:payoutId}, {});
});

