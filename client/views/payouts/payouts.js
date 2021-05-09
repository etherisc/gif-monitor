Template.Payouts.onCreated(function() {
	
});

Template.Payouts.onDestroyed(function() {
	
});

Template.Payouts.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Payouts.events({
	
});

Template.Payouts.helpers({
	
});
