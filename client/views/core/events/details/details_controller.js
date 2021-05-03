this.CoreEventsDetailsController = RouteController.extend({
	template: "Core",
	

	yieldTemplates: {
		'CoreEventsDetails': { to: 'CoreSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Core"); this.render("loading", { to: "CoreSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("event1", this.params.eventId)
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
			event1: Events.findOne({_id:this.params.eventId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});