Template.Applications.onCreated(function() {
	
});

Template.Applications.onDestroyed(function() {
	
});

Template.Applications.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Applications.events({
	
});

Template.Applications.helpers({
	
});
