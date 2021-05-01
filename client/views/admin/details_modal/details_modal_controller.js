this.AdminDetailsModalController = RouteController.extend({
	template: "AdminDetailsModal",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		var loglineId = "";

		var subs = [
			Meteor.subscribe("logline", loglineId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		var loglineId = "";

		var data = {
			params: this.params || {},
			logline: Logs.findOne({_id:loglineId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});