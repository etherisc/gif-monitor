Template.OraclesPublic.onCreated(function() {
	
});

Template.OraclesPublic.onDestroyed(function() {
	
});

Template.OraclesPublic.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.OraclesPublic.events({
	
});

Template.OraclesPublic.helpers({
	
});

Template.OraclesPublicSideMenu.onCreated(function() {
	
});

Template.OraclesPublicSideMenu.onDestroyed(function() {
	
});

Template.OraclesPublicSideMenu.onRendered(function() {
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

Template.OraclesPublicSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.OraclesPublicSideMenu.helpers({
	
});
