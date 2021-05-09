Template.Metadata.onCreated(function() {
	
});

Template.Metadata.onDestroyed(function() {
	
});

Template.Metadata.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Metadata.events({
	
});

Template.Metadata.helpers({
	
});
