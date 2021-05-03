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
		this.chainListPagedExtraParams = {
			searchText: Session.get("ChainListPagedSearchString") || "",
			searchFields: Session.get("ChainListPagedSearchFields") || ["chain_id", "name", "native_coin", "explorer_tx_url", "explorer_address_url"],
			sortBy: Session.get("ChainListPagedSortBy") || "",
			sortAscending: Session.get("ChainListPagedSortAscending"),
			pageNo: Session.get("ChainListPagedPageNo") || 0,
			pageSize: Session.get("ChainListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("chain_list_paged", this.chainListPagedExtraParams),
			Meteor.subscribe("chain_list_paged_count", this.chainListPagedExtraParams)
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
			chain_list_paged: Chains.find(databaseUtils.extendFilter({}, this.chainListPagedExtraParams), databaseUtils.extendOptions({sort:["name","asc"]}, this.chainListPagedExtraParams)),
			chain_list_paged_count: Counts.get("chain_list_paged_count")
		};
		

		
		data.chain_list_paged_page_count = this.chainListPagedExtraParams && this.chainListPagedExtraParams.pageSize ? Math.ceil(data.chain_list_paged_count / this.chainListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.chainListPagedExtraParams.pageNo >= data.chain_list_paged_page_count) {
			Session.set("ChainListPagedPageNo", data.chain_list_paged_page_count > 0 ? data.chain_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});