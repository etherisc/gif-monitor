Template.Policies.onCreated(function() {
	
});

Template.Policies.onDestroyed(function() {
	
});

Template.Policies.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Policies.events({
	
});

Template.Policies.helpers({
	
});
