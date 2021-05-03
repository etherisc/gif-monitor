Template.Core.onCreated(function() {
	
});

Template.Core.onDestroyed(function() {
	
});

Template.Core.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Core.events({
	
});

Template.Core.helpers({
	
});

Template.CoreSideMenu.onCreated(function() {
	
});

Template.CoreSideMenu.onDestroyed(function() {
	
});

Template.CoreSideMenu.onRendered(function() {
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

Template.CoreSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.CoreSideMenu.helpers({
	
});
