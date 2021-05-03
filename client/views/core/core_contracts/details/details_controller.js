this.CoreCoreContractsDetailsController = RouteController.extend({
	template: "Core",
	

	yieldTemplates: {
		'CoreCoreContractsDetails': { to: 'CoreSubcontent'}
		
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
			Meteor.subscribe("contract_public", this.params.contractId)
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
			contract_public: Contracts.findOne({_id:this.params.contractId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});