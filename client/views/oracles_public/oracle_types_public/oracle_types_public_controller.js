this.OraclesPublicOracleTypesPublicController = RouteController.extend({
	template: "OraclesPublicOracleTypesPublic",
	

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
		this.oracleTypeListPagedExtraParams = {
			searchText: Session.get("OracleTypeListPagedSearchString") || "",
			searchFields: Session.get("OracleTypeListPagedSearchFields") || ["name", "initialized", "activated", "input_format", "callback_format", "active_oracles", "assigned_oracles", "index"],
			sortBy: Session.get("OracleTypeListPagedSortBy") || "",
			sortAscending: Session.get("OracleTypeListPagedSortAscending"),
			pageNo: Session.get("OracleTypeListPagedPageNo") || 0,
			pageSize: Session.get("OracleTypeListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("oracle_type_list_paged", this.oracleTypeListPagedExtraParams),
			Meteor.subscribe("oracle_type_list_paged_count", this.oracleTypeListPagedExtraParams)
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
			oracle_type_list_paged: OracleTypes.find(databaseUtils.extendFilter({}, this.oracleTypeListPagedExtraParams), databaseUtils.extendOptions({}, this.oracleTypeListPagedExtraParams)),
			oracle_type_list_paged_count: Counts.get("oracle_type_list_paged_count")
		};
		

		
		data.oracle_type_list_paged_page_count = this.oracleTypeListPagedExtraParams && this.oracleTypeListPagedExtraParams.pageSize ? Math.ceil(data.oracle_type_list_paged_count / this.oracleTypeListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.oracleTypeListPagedExtraParams.pageNo >= data.oracle_type_list_paged_page_count) {
			Session.set("OracleTypeListPagedPageNo", data.oracle_type_list_paged_page_count > 0 ? data.oracle_type_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});