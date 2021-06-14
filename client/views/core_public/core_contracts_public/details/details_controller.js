this.CorePublicCoreContractsPublicDetailsController = RouteController.extend({
	template: "CorePublicCoreContractsPublicDetails",
	

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
			Meteor.subscribe("contract", this.params.contractId)
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
			contract: Contracts.findOne({_id:this.params.contractId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});