this.CorePublicEventsPublicDetailsController = RouteController.extend({
	template: "CorePublic",
	

	yieldTemplates: {
		'CorePublicEventsPublicDetails': { to: 'CorePublicSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("CorePublic"); this.render("loading", { to: "CorePublicSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("event", this.params.eventId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			event: Events.findOne({_id:this.params.eventId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});