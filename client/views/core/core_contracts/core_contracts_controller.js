this.CoreCoreContractsController = RouteController.extend({
	template: "Core",
	

	yieldTemplates: {
		'CoreCoreContracts': { to: 'CoreSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Core"); this.render("loading", { to: "CoreSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.contractList2PagedExtraParams = {
			searchText: Session.get("ContractList2PagedSearchString") || "",
			searchFields: Session.get("ContractList2PagedSearchFields") || ["chain_id", "address", "name", "abi", "deployment_txhash", "deployed_at_block"],
			sortBy: Session.get("ContractList2PagedSortBy") || "",
			sortAscending: Session.get("ContractList2PagedSortAscending"),
			pageNo: Session.get("ContractList2PagedPageNo") || 0,
			pageSize: Session.get("ContractList2PagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("contract_list2_paged", this.contractList2PagedExtraParams),
			Meteor.subscribe("contract_list2_paged_count", this.contractList2PagedExtraParams)
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
			contract_list2_paged: Contracts.find(databaseUtils.extendFilter({}, this.contractList2PagedExtraParams), databaseUtils.extendOptions({}, this.contractList2PagedExtraParams)),
			contract_list2_paged_count: Counts.get("contract_list2_paged_count")
		};
		

		
		data.contract_list2_paged_page_count = this.contractList2PagedExtraParams && this.contractList2PagedExtraParams.pageSize ? Math.ceil(data.contract_list2_paged_count / this.contractList2PagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.contractList2PagedExtraParams.pageNo >= data.contract_list2_paged_page_count) {
			Session.set("ContractList2PagedPageNo", data.contract_list2_paged_page_count > 0 ? data.contract_list2_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});