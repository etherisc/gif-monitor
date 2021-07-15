Meteor.publish("claim_list", function() {
	return Claims.find({}, {sort:{updated_at:-1}});
});

Meteor.publish("claim", function(claimId) {
	return Claims.find({_id:claimId}, {});
});

