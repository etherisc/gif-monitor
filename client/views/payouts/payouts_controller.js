this.PayoutsController = RouteController.extend({
	template: "Payouts",
	

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
		this.payoutListPagedExtraParams = {
			searchText: Session.get("PayoutListPagedSearchString") || "",
			searchFields: Session.get("PayoutListPagedSearchFields") || ["payout_id", "metadata_id", "claim_id", "expected_amount", "actual_amount", "state", "state_message", "created_at", "updated_at", "metadata_mongo_id", "claim_mongo_id"],
			sortBy: Session.get("PayoutListPagedSortBy") || "",
			sortAscending: Session.get("PayoutListPagedSortAscending"),
			pageNo: Session.get("PayoutListPagedPageNo") || 0,
			pageSize: Session.get("PayoutListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("payout_list_paged", this.payoutListPagedExtraParams),
			Meteor.subscribe("payout_list_paged_count", this.payoutListPagedExtraParams)
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
			payout_list_paged: Payouts.find(databaseUtils.extendFilter({}, this.payoutListPagedExtraParams), databaseUtils.extendOptions({}, this.payoutListPagedExtraParams)),
			payout_list_paged_count: Counts.get("payout_list_paged_count")
		};
		

		
		data.payout_list_paged_page_count = this.payoutListPagedExtraParams && this.payoutListPagedExtraParams.pageSize ? Math.ceil(data.payout_list_paged_count / this.payoutListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.payoutListPagedExtraParams.pageNo >= data.payout_list_paged_page_count) {
			Session.set("PayoutListPagedPageNo", data.payout_list_paged_page_count > 0 ? data.payout_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});