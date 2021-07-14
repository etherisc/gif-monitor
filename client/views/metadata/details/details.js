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

Template.MetadataDetailsDataDisplay.created = function() {

};

Template.MetadataDetailsDataDisplay.destroyed = function() {

};

Template.MetadataDetailsDataDisplay.rendered = function() {
	const bpData = ReactiveMethod.call('bpData', this.data.metadata.bp_key);
	console.log(bpData);	
};

Template.MetadataDetailsDataDisplay.helpers({

});

Template.MetadataDetailsDataDisplay.events({

});
