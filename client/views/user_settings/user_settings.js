Template.UserSettings.onCreated(function() {
	
});

Template.UserSettings.onDestroyed(function() {
	
});

Template.UserSettings.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.UserSettings.events({
	
});

Template.UserSettings.helpers({
	
});

Template.UserSettingsSideMenu.onCreated(function() {
	
});

Template.UserSettingsSideMenu.onDestroyed(function() {
	
});

Template.UserSettingsSideMenu.onRendered(function() {
	$(".menu-item-collapse .dropdown-toggle").each(function() {
		if($(this).find("li.active")) {
			$(this).removeClass("collapsed");
		}
		$(this).parent().find(".collapse").each(function() {
			if($(this).find("li.active").length) {
				$(this).addClass("in");
			}
		});
	});
	
});

Template.UserSettingsSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.UserSettingsSideMenu.helpers({
	
});
