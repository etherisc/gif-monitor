this.OraclesPublicOraclesPublicDetailsController = RouteController.extend({
	template: "OraclesPublicOraclesPublicDetails",
	

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
			Meteor.subscribe("oracle", this.params.oracleId)
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
			oracle: Oracles.findOne({_id:this.params.oracleId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});