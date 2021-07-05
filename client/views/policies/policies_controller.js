this.PoliciesController = RouteController.extend({
	template: "Policies",
	

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
		this.policyListPagedExtraParams = {
			searchText: Session.get("PolicyListPagedSearchString") || "",
			searchFields: Session.get("PolicyListPagedSearchFields") || ["bp_key", "metadata_mongo_id", "state", "created_at", "updated_at"],
			sortBy: Session.get("PolicyListPagedSortBy") || "",
			sortAscending: Session.get("PolicyListPagedSortAscending"),
			pageNo: Session.get("PolicyListPagedPageNo") || 0,
			pageSize: Session.get("PolicyListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("policy_list_paged", this.policyListPagedExtraParams),
			Meteor.subscribe("policy_list_paged_count", this.policyListPagedExtraParams)
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
			policy_list_paged: Policies.find(databaseUtils.extendFilter({}, this.policyListPagedExtraParams), databaseUtils.extendOptions({sort:{updated_at:-1}}, this.policyListPagedExtraParams)),
			policy_list_paged_count: Counts.get("policy_list_paged_count")
		};
		

		
		data.policy_list_paged_page_count = this.policyListPagedExtraParams && this.policyListPagedExtraParams.pageSize ? Math.ceil(data.policy_list_paged_count / this.policyListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.policyListPagedExtraParams.pageNo >= data.policy_list_paged_page_count) {
			Session.set("PolicyListPagedPageNo", data.policy_list_paged_page_count > 0 ? data.policy_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});