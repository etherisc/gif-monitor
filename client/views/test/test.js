Template.Test.onCreated(function() {
	
});

Template.Test.onDestroyed(function() {
	
});

Template.Test.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Test.events({
	
});

Template.Test.helpers({
	
});

Template.TestNewCustomComponent.created = function() {

};

Template.TestNewCustomComponent.destroyed = function() {

};

Template.TestNewCustomComponent.rendered = function() {

};

Template.TestNewCustomComponent.helpers({

});

Template.TestNewCustomComponent.events({

});
