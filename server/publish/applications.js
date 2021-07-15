Meteor.publish("application_list", function() {
	return Applications.find({}, {sort:{updated_at:-1}});
});

Meteor.publish("application", function(applicationId) {
	return Applications.find({_id:applicationId}, {});
});

