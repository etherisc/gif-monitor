Template.PoliciesPublicClaimsPublic.onCreated(function() {
	
});

Template.PoliciesPublicClaimsPublic.onDestroyed(function() {
	
});

Template.PoliciesPublicClaimsPublic.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PoliciesPublicClaimsPublic.events({
	
});

Template.PoliciesPublicClaimsPublic.helpers({
	
});

Template.PoliciesPublicClaimsPublicComingSoon.onCreated(function() {
	
});

Template.PoliciesPublicClaimsPublicComingSoon.onDestroyed(function() {
	
});

Template.PoliciesPublicClaimsPublicComingSoon.onRendered(function() {
	
});

Template.PoliciesPublicClaimsPublicComingSoon.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
	
});

Template.PoliciesPublicClaimsPublicComingSoon.helpers({
	
});
