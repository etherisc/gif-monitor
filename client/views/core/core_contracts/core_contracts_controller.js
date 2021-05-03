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
		this.contractListPublicPagedExtraParams = {
			searchText: Session.get("ContractListPublicPagedSearchString") || "",
			searchFields: Session.get("ContractListPublicPagedSearchFields") || ["chain_data.name", "address", "name", "abi", "deployment_txhash", "deployed_at_block"],
			sortBy: Session.get("ContractListPublicPagedSortBy") || "",
			sortAscending: Session.get("ContractListPublicPagedSortAscending"),
			pageNo: Session.get("ContractListPublicPagedPageNo") || 0,
			pageSize: Session.get("ContractListPublicPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("contract_list_public_paged", this.contractListPublicPagedExtraParams),
			Meteor.subscribe("contract_list_public_paged_count", this.contractListPublicPagedExtraParams)
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
			contract_list_public_paged: Contracts.find(databaseUtils.extendFilter({}, this.contractListPublicPagedExtraParams), databaseUtils.extendOptions({}, this.contractListPublicPagedExtraParams)),
			contract_list_public_paged_count: Counts.get("contract_list_public_paged_count")
		};
		

		
		data.contract_list_public_paged_page_count = this.contractListPublicPagedExtraParams && this.contractListPublicPagedExtraParams.pageSize ? Math.ceil(data.contract_list_public_paged_count / this.contractListPublicPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.contractListPublicPagedExtraParams.pageNo >= data.contract_list_public_paged_page_count) {
			Session.set("ContractListPublicPagedPageNo", data.contract_list_public_paged_page_count > 0 ? data.contract_list_public_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});