Template.PoliciesPublic.onCreated(function() {
	
});

Template.PoliciesPublic.onDestroyed(function() {
	
});

Template.PoliciesPublic.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PoliciesPublic.events({
	
});

Template.PoliciesPublic.helpers({
	
});

Template.PoliciesPublicSideMenu.onCreated(function() {
	
});

Template.PoliciesPublicSideMenu.onDestroyed(function() {
	
});

Template.PoliciesPublicSideMenu.onRendered(function() {
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

Template.PoliciesPublicSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.PoliciesPublicSideMenu.helpers({
	
});
