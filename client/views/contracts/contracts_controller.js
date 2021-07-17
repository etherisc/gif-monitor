this.ContractsController = RouteController.extend({
	template: "Contracts",
	

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
		this.contractListPagedExtraParams = {
			searchText: Session.get("ContractListPagedSearchString") || "",
			searchFields: Session.get("ContractListPagedSearchFields") || ["instance_name", "instance_id", "name", "address", "release"],
			sortBy: Session.get("ContractListPagedSortBy") || "",
			sortAscending: Session.get("ContractListPagedSortAscending"),
			pageNo: Session.get("ContractListPagedPageNo") || 0,
			pageSize: Session.get("ContractListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("contract_list_paged", this.contractListPagedExtraParams),
			Meteor.subscribe("contract_list_paged_count", this.contractListPagedExtraParams)
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
			contract_list_paged: Contracts.find(databaseUtils.extendFilter({}, this.contractListPagedExtraParams), databaseUtils.extendOptions({}, this.contractListPagedExtraParams)),
			contract_list_paged_count: Counts.get("contract_list_paged_count")
		};
		

		
		data.contract_list_paged_page_count = this.contractListPagedExtraParams && this.contractListPagedExtraParams.pageSize ? Math.ceil(data.contract_list_paged_count / this.contractListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.contractListPagedExtraParams.pageNo >= data.contract_list_paged_page_count) {
			Session.set("ContractListPagedPageNo", data.contract_list_paged_page_count > 0 ? data.contract_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});