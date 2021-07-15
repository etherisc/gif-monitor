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

Template.HomePublicKeyVisual.created = function() {

};

Template.HomePublicKeyVisual.destroyed = function() {

};

Template.HomePublicKeyVisual.rendered = function() {

};

Template.HomePublicKeyVisual.helpers({

});

Template.HomePublicKeyVisual.events({

});
