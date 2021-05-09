Template.Claims.onCreated(function() {
	
});

Template.Claims.onDestroyed(function() {
	
});

Template.Claims.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Claims.events({
	
});

Template.Claims.helpers({
	
});
