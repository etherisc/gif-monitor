this.OraclesController = RouteController.extend({
	template: "Oracles",
	

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
		this.oracleListPagedExtraParams = {
			searchText: Session.get("OracleListPagedSearchString") || "",
			searchFields: Session.get("OracleListPagedSearchFields") || ["oracle_id", "description", "oracle_contract", "oracle_owner", "active_oracle_types"],
			sortBy: Session.get("OracleListPagedSortBy") || "",
			sortAscending: Session.get("OracleListPagedSortAscending"),
			pageNo: Session.get("OracleListPagedPageNo") || 0,
			pageSize: Session.get("OracleListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("oracle_list_paged", this.oracleListPagedExtraParams),
			Meteor.subscribe("oracle_list_paged_count", this.oracleListPagedExtraParams)
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
			oracle_list_paged: Oracles.find(databaseUtils.extendFilter({}, this.oracleListPagedExtraParams), databaseUtils.extendOptions({}, this.oracleListPagedExtraParams)),
			oracle_list_paged_count: Counts.get("oracle_list_paged_count")
		};
		

		
		data.oracle_list_paged_page_count = this.oracleListPagedExtraParams && this.oracleListPagedExtraParams.pageSize ? Math.ceil(data.oracle_list_paged_count / this.oracleListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.oracleListPagedExtraParams.pageNo >= data.oracle_list_paged_page_count) {
			Session.set("OracleListPagedPageNo", data.oracle_list_paged_page_count > 0 ? data.oracle_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});