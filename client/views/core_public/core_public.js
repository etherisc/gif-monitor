Template.CorePublic.onCreated(function() {
	
});

Template.CorePublic.onDestroyed(function() {
	
});

Template.CorePublic.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CorePublic.events({
	
});

Template.CorePublic.helpers({
	
});
