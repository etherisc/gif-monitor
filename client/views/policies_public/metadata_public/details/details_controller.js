this.PoliciesPublicMetadataPublicDetailsController = RouteController.extend({
	template: "PoliciesPublicMetadataPublicDetails",
	

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
			Meteor.subscribe("metadata", this.params.metadataId)
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
			metadata: Metadata.findOne({_id:this.params.metadataId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});