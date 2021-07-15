Template.MetadataDetails.onCreated(function() {
	
});

Template.MetadataDetails.onDestroyed(function() {
	
});

Template.MetadataDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.MetadataDetails.events({
	
});

Template.MetadataDetails.helpers({
	
});

Template.MetadataDetailsBpDoc.created = function() {

};

Template.MetadataDetailsBpDoc.destroyed = function() {

};

Template.MetadataDetailsBpDoc.rendered = function() {

};

Template.MetadataDetailsBpDoc.helpers({

});

Template.MetadataDetailsBpDoc.events({

});
