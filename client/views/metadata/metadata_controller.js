this.MetadataController = RouteController.extend({
	template: "Metadata",
	

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
		this.metadataListPagedExtraParams = {
			searchText: Session.get("MetadataListPagedSearchString") || "",
			searchFields: Session.get("MetadataListPagedSearchFields") || ["bp_key", "bp_key_index", "product_id", "product_mongo_id", "options", "has_application", "application_mongo_id", "has_policy", "policy_mongo_id", "claims_count", "payouts_count", "registry", "token", "release", "state", "created_at", "updated_at"],
			sortBy: Session.get("MetadataListPagedSortBy") || "",
			sortAscending: Session.get("MetadataListPagedSortAscending"),
			pageNo: Session.get("MetadataListPagedPageNo") || 0,
			pageSize: Session.get("MetadataListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("metadata_list_paged", this.metadataListPagedExtraParams),
			Meteor.subscribe("metadata_list_paged_count", this.metadataListPagedExtraParams)
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
			metadata_list_paged: Metadata.find(databaseUtils.extendFilter({}, this.metadataListPagedExtraParams), databaseUtils.extendOptions({}, this.metadataListPagedExtraParams)),
			metadata_list_paged_count: Counts.get("metadata_list_paged_count")
		};
		

		
		data.metadata_list_paged_page_count = this.metadataListPagedExtraParams && this.metadataListPagedExtraParams.pageSize ? Math.ceil(data.metadata_list_paged_count / this.metadataListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.metadataListPagedExtraParams.pageNo >= data.metadata_list_paged_page_count) {
			Session.set("MetadataListPagedPageNo", data.metadata_list_paged_page_count > 0 ? data.metadata_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});