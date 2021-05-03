Template.CorePublic.onCreated(function() {
	
});

Template.CorePublic.onDestroyed(function() {
	
});

Template.CorePublic.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CorePublic.events({
	
});

Template.CorePublic.helpers({
	
});

Template.CorePublicSideMenu.onCreated(function() {
	
});

Template.CorePublicSideMenu.onDestroyed(function() {
	
});

Template.CorePublicSideMenu.onRendered(function() {
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

Template.CorePublicSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.CorePublicSideMenu.helpers({
	
});
