this.PayoutsDetailsController = RouteController.extend({
	template: "PayoutsDetails",
	

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


		

		var subs = [
			Meteor.subscribe("payout", this.params.payoutId)
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
			payout: Payouts.findOne({_id:this.params.payoutId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});