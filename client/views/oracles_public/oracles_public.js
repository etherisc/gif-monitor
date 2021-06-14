Template.OraclesPublic.onCreated(function() {
	
});

Template.OraclesPublic.onDestroyed(function() {
	
});

Template.OraclesPublic.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.OraclesPublic.events({
	
});

Template.OraclesPublic.helpers({
	
});
