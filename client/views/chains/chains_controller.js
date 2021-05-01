this.ChainsController = RouteController.extend({
	template: "Chains",
	

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
		this.chainList1PagedExtraParams = {
			searchText: Session.get("ChainList1PagedSearchString") || "",
			searchFields: Session.get("ChainList1PagedSearchFields") || ["chain_id", "name", "native_coin", "explorer_tx_url", "explorer_address_url"],
			sortBy: Session.get("ChainList1PagedSortBy") || "",
			sortAscending: Session.get("ChainList1PagedSortAscending"),
			pageNo: Session.get("ChainList1PagedPageNo") || 0,
			pageSize: Session.get("ChainList1PagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("chain_list1_paged", this.chainList1PagedExtraParams),
			Meteor.subscribe("chain_list1_paged_count", this.chainList1PagedExtraParams)
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
			chain_list1_paged: Chains.find(databaseUtils.extendFilter({}, this.chainList1PagedExtraParams), databaseUtils.extendOptions({}, this.chainList1PagedExtraParams)),
			chain_list1_paged_count: Counts.get("chain_list1_paged_count")
		};
		

		
		data.chain_list1_paged_page_count = this.chainList1PagedExtraParams && this.chainList1PagedExtraParams.pageSize ? Math.ceil(data.chain_list1_paged_count / this.chainList1PagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.chainList1PagedExtraParams.pageNo >= data.chain_list1_paged_page_count) {
			Session.set("ChainList1PagedPageNo", data.chain_list1_paged_page_count > 0 ? data.chain_list1_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});