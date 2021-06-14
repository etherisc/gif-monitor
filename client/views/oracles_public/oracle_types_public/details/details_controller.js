this.OraclesPublicOracleTypesPublicDetailsController = RouteController.extend({
	template: "OraclesPublicOracleTypesPublicDetails",
	

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
			Meteor.subscribe("oracle_type", this.params.oracleTypeId)
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
			oracle_type: OracleTypes.findOne({_id:this.params.oracleTypeId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});