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
		this.metadataSingleListPagedExtraParams = {
			searchText: Session.get("MetadataSingleListPagedSearchString") || "",
			searchFields: Session.get("MetadataSingleListPagedSearchFields") || ["metadata_id", "application_id", "policy_id", "claims_ids", "payout_ids", "has_policy", "has_application", "token", "registry", "release", "state", "state_message", "bp_external_key", "created_at", "updated_at", "application_mongo_id", "policy_mongo_id"],
			sortBy: Session.get("MetadataSingleListPagedSortBy") || "",
			sortAscending: Session.get("MetadataSingleListPagedSortAscending"),
			pageNo: Session.get("MetadataSingleListPagedPageNo") || 0,
			pageSize: Session.get("MetadataSingleListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("metadata_single_list_paged", this.metadataSingleListPagedExtraParams),
			Meteor.subscribe("metadata_single_list_paged_count", this.metadataSingleListPagedExtraParams)
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
			metadata_single_list_paged: Metadata.find(databaseUtils.extendFilter({}, this.metadataSingleListPagedExtraParams), databaseUtils.extendOptions({}, this.metadataSingleListPagedExtraParams)),
			metadata_single_list_paged_count: Counts.get("metadata_single_list_paged_count")
		};
		

		
		data.metadata_single_list_paged_page_count = this.metadataSingleListPagedExtraParams && this.metadataSingleListPagedExtraParams.pageSize ? Math.ceil(data.metadata_single_list_paged_count / this.metadataSingleListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.metadataSingleListPagedExtraParams.pageNo >= data.metadata_single_list_paged_page_count) {
			Session.set("MetadataSingleListPagedPageNo", data.metadata_single_list_paged_page_count > 0 ? data.metadata_single_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});