this.PoliciesPublicMetadataPublicDetailsController = RouteController.extend({
	template: "PoliciesPublic",
	

	yieldTemplates: {
		'PoliciesPublicMetadataPublicDetails': { to: 'PoliciesPublicSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("PoliciesPublic"); this.render("loading", { to: "PoliciesPublicSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("metadata", this.params.id)
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
			metadata: Metadata.findOne({_id:this.params.id}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});