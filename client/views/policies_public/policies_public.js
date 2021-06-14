Template.PoliciesPublic.onCreated(function() {
	
});

Template.PoliciesPublic.onDestroyed(function() {
	
});

Template.PoliciesPublic.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PoliciesPublic.events({
	
});

Template.PoliciesPublic.helpers({
	
});
