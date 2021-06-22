Template.PoliciesPublicPayoutsPublic.onCreated(function() {
	
});

Template.PoliciesPublicPayoutsPublic.onDestroyed(function() {
	
});

Template.PoliciesPublicPayoutsPublic.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PoliciesPublicPayoutsPublic.events({
	
});

Template.PoliciesPublicPayoutsPublic.helpers({
	
});

Template.PoliciesPublicPayoutsPublicComingSoon.onCreated(function() {
	
});

Template.PoliciesPublicPayoutsPublicComingSoon.onDestroyed(function() {
	
});

Template.PoliciesPublicPayoutsPublicComingSoon.onRendered(function() {
	
});

Template.PoliciesPublicPayoutsPublicComingSoon.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
	
});

Template.PoliciesPublicPayoutsPublicComingSoon.helpers({
	
});
