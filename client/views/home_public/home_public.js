Template.HomePublic.onCreated(function() {
	
});

Template.HomePublic.onDestroyed(function() {
	
});

Template.HomePublic.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.HomePublic.events({
	
});

Template.HomePublic.helpers({
	
});

Template.HomePublicSpacer.created = function() {

};

Template.HomePublicSpacer.destroyed = function() {

};

Template.HomePublicSpacer.rendered = function() {

};

Template.HomePublicSpacer.helpers({

});

Template.HomePublicSpacer.events({

});

Template.HomePublicHomeJumbotron.onCreated(function() {
	
});

Template.HomePublicHomeJumbotron.onDestroyed(function() {
	
});

Template.HomePublicHomeJumbotron.onRendered(function() {
	
});

Template.HomePublicHomeJumbotron.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("core_public.core_contracts_public", {});
	}
	
});

Template.HomePublicHomeJumbotron.helpers({
	
});
