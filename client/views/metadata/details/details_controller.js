this.MetadataDetailsController = RouteController.extend({
	template: "MetadataDetails",
	

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
			Meteor.subscribe("metadata_single", this.params.metadataSingleId)
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
			metadata_single: Metadata.findOne({_id:this.params.metadataSingleId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});