this.ClaimsController = RouteController.extend({
	template: "Claims",
	

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
		this.claimListPagedExtraParams = {
			searchText: Session.get("ClaimListPagedSearchString") || "",
			searchFields: Session.get("ClaimListPagedSearchFields") || ["bp_key", "metadata_mongo_id", "data", "state", "created_at", "updated_at"],
			sortBy: Session.get("ClaimListPagedSortBy") || "",
			sortAscending: Session.get("ClaimListPagedSortAscending"),
			pageNo: Session.get("ClaimListPagedPageNo") || 0,
			pageSize: Session.get("ClaimListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("claim_list_paged", this.claimListPagedExtraParams),
			Meteor.subscribe("claim_list_paged_count", this.claimListPagedExtraParams)
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
			claim_list_paged: Claims.find(databaseUtils.extendFilter({}, this.claimListPagedExtraParams), databaseUtils.extendOptions({sort:{updated_at:-1}}, this.claimListPagedExtraParams)),
			claim_list_paged_count: Counts.get("claim_list_paged_count")
		};
		

		
		data.claim_list_paged_page_count = this.claimListPagedExtraParams && this.claimListPagedExtraParams.pageSize ? Math.ceil(data.claim_list_paged_count / this.claimListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.claimListPagedExtraParams.pageNo >= data.claim_list_paged_page_count) {
			Session.set("ClaimListPagedPageNo", data.claim_list_paged_page_count > 0 ? data.claim_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});