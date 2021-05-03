Meteor.publish("users_null", function() {
	return Users.find({_id:null}, {});
});

