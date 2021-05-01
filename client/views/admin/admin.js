Template.Admin.onCreated(function() {
	
});

Template.Admin.onDestroyed(function() {
	
});

Template.Admin.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Admin.events({
	
});

Template.Admin.helpers({
	
});

Template.AdminSideMenu.onCreated(function() {
	
});

Template.AdminSideMenu.onDestroyed(function() {
	
});

Template.AdminSideMenu.onRendered(function() {
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

Template.AdminSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.AdminSideMenu.helpers({
	
});
