Template.layout.onCreated(function() {
	
});

Template.layout.onDestroyed(function() {
	
});

Template.layout.onRendered(function() {
	// scroll to anchor
	$('body').on('click', 'a', function(e) { 
		var href = $(this).attr("href");
		if(!href) {
			return;
		}
		if(href.length > 1 && href.charAt(0) == "#") {
			var hash = href.substring(1);
			if(hash) {
				e.preventDefault();

				var offset = $('*[id="' + hash + '"]').offset();

				if (offset) {
					$('html,body').animate({ scrollTop: offset.top - 60 }, 400);
				}
			}
		} else {
			if(href.indexOf("http://") != 0 && href.indexOf("https://") != 0 && href.indexOf("#") != 0) {
				$('html,body').scrollTop(0);
			}
		}
	}); 
	
});

Template.layout.events({ 
    "click": function(event) { // Fix Bootstrap Dropdown Menu Collapse on click outside Menu
        var clickover = $(event.target).closest(".dropdown-toggle").length;
        var opened = $(".navbar-collapse").hasClass("in");
        if (opened === true && !clickover) {
            $('.navbar-collapse').collapse('hide');
        }
    },

    "keyup": function(event) {
        if (event.keyCode === 27) { // Bootstrap Dropdown Menu Collapse on ESC pressed
            var opened = $(".navbar-collapse").hasClass("in");
            if (opened === true) {
                $('.navbar-collapse').collapse('hide');
            }
        }
    }
});

Template.layout.helpers({ 
	"privateData": function() {
		
		return {
			params: this.params || {}
		};
		
	},
	"publicData": function() {
		
		return {
			params: this.params || {}
		};
		
	}
});

Template.FreeLayout.onCreated(function() {
	
	var subs = [
		];
});

Template.FreeLayout.events({
	
});

Template.FreeLayout.helpers({
	
});

Template.PublicLayout.onCreated(function() {
	
	var subs = [
		];
});

Template.PublicLayout.events({
	
});

Template.PublicLayout.helpers({
	
});

Template.PublicLayoutLeftMenu.onCreated(function() {
	
});

Template.PublicLayoutLeftMenu.onDestroyed(function() {
	
});

Template.PublicLayoutLeftMenu.onRendered(function() {
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

Template.PublicLayoutLeftMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.PublicLayoutLeftMenu.helpers({
	
});

Template.PublicLayoutRightMenu.onCreated(function() {
	
});

Template.PublicLayoutRightMenu.onDestroyed(function() {
	
});

Template.PublicLayoutRightMenu.onRendered(function() {
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

Template.PublicLayoutRightMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.PublicLayoutRightMenu.helpers({
	
});

Template.PrivateLayout.onCreated(function() {
	
	var subs = [
		];
});

Template.PrivateLayout.events({
	
});

Template.PrivateLayout.helpers({
	
});

Template.PrivateLayoutLeftMenu.onCreated(function() {
	
});

Template.PrivateLayoutLeftMenu.onDestroyed(function() {
	
});

Template.PrivateLayoutLeftMenu.onRendered(function() {
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

Template.PrivateLayoutLeftMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.PrivateLayoutLeftMenu.helpers({
	
});

Template.PrivateLayoutRightMenu.onCreated(function() {
	
});

Template.PrivateLayoutRightMenu.onDestroyed(function() {
	
});

Template.PrivateLayoutRightMenu.onRendered(function() {
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

Template.PrivateLayoutRightMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.PrivateLayoutRightMenu.helpers({
	
});
