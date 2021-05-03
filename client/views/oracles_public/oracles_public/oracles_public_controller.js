this.OraclesPublicOraclesPublicController = RouteController.extend({
	template: "OraclesPublic",
	

	yieldTemplates: {
		'OraclesPublicOraclesPublic': { to: 'OraclesPublicSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("OraclesPublic"); this.render("loading", { to: "OraclesPublicSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.oracleList1PagedExtraParams = {
			searchText: Session.get("OracleList1PagedSearchString") || "",
			searchFields: Session.get("OracleList1PagedSearchFields") || ["description", "oracle_contract", "oracle_owner", "active_oracle_types"],
			sortBy: Session.get("OracleList1PagedSortBy") || "",
			sortAscending: Session.get("OracleList1PagedSortAscending"),
			pageNo: Session.get("OracleList1PagedPageNo") || 0,
			pageSize: Session.get("OracleList1PagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("oracle_list1_paged", this.oracleList1PagedExtraParams),
			Meteor.subscribe("oracle_list1_paged_count", this.oracleList1PagedExtraParams)
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
			oracle_list1_paged: Oracles.find(databaseUtils.extendFilter({}, this.oracleList1PagedExtraParams), databaseUtils.extendOptions({}, this.oracleList1PagedExtraParams)),
			oracle_list1_paged_count: Counts.get("oracle_list1_paged_count")
		};
		

		
		data.oracle_list1_paged_page_count = this.oracleList1PagedExtraParams && this.oracleList1PagedExtraParams.pageSize ? Math.ceil(data.oracle_list1_paged_count / this.oracleList1PagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.oracleList1PagedExtraParams.pageNo >= data.oracle_list1_paged_page_count) {
			Session.set("OracleList1PagedPageNo", data.oracle_list1_paged_page_count > 0 ? data.oracle_list1_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});