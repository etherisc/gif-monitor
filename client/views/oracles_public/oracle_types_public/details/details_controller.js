this.OraclesPublicOracleTypesPublicDetailsController = RouteController.extend({
	template: "OraclesPublic",
	

	yieldTemplates: {
		'OraclesPublicOracleTypesPublicDetails': { to: 'OraclesPublicSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("OraclesPublic"); this.render("loading", { to: "OraclesPublicSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("oracle_type1", this.params.oracleTypeId)
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
			oracle_type1: OracleTypes.findOne({_id:this.params.oracleTypeId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});