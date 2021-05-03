this.CorePublicCoreContractsPublicDetailsController = RouteController.extend({
	template: "CorePublic",
	

	yieldTemplates: {
		'CorePublicCoreContractsPublicDetails': { to: 'CorePublicSubcontent'}
		
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