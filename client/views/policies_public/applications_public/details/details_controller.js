this.PoliciesPublicApplicationsPublicDetailsController = RouteController.extend({
	template: "PoliciesPublic",
	

	yieldTemplates: {
		'PoliciesPublicApplicationsPublicDetails': { to: 'PoliciesPublicSubcontent'}
		
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
			Meteor.subscribe("application", this.params.applicationId)
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
			application: Applications.findOne({_id:this.params.applicationId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});