this.OraclesPublicOracleTypesPublicController = RouteController.extend({
	template: "OraclesPublic",
	

	yieldTemplates: {
		'OraclesPublicOracleTypesPublic': { to: 'OraclesPublicSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("OraclesPublic"); this.render("loading", { to: "OraclesPublicSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.oracleTypeList1PagedExtraParams = {
			searchText: Session.get("OracleTypeList1PagedSearchString") || "",
			searchFields: Session.get("OracleTypeList1PagedSearchFields") || ["name", "initialized", "activated", "input_format", "callback_format", "active_oracles", "assigned_oracles", "index"],
			sortBy: Session.get("OracleTypeList1PagedSortBy") || "",
			sortAscending: Session.get("OracleTypeList1PagedSortAscending"),
			pageNo: Session.get("OracleTypeList1PagedPageNo") || 0,
			pageSize: Session.get("OracleTypeList1PagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("oracle_type_list1_paged", this.oracleTypeList1PagedExtraParams),
			Meteor.subscribe("oracle_type_list1_paged_count", this.oracleTypeList1PagedExtraParams)
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
			oracle_type_list1_paged: OracleTypes.find(databaseUtils.extendFilter({}, this.oracleTypeList1PagedExtraParams), databaseUtils.extendOptions({}, this.oracleTypeList1PagedExtraParams)),
			oracle_type_list1_paged_count: Counts.get("oracle_type_list1_paged_count")
		};
		

		
		data.oracle_type_list1_paged_page_count = this.oracleTypeList1PagedExtraParams && this.oracleTypeList1PagedExtraParams.pageSize ? Math.ceil(data.oracle_type_list1_paged_count / this.oracleTypeList1PagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.oracleTypeList1PagedExtraParams.pageNo >= data.oracle_type_list1_paged_page_count) {
			Session.set("OracleTypeList1PagedPageNo", data.oracle_type_list1_paged_page_count > 0 ? data.oracle_type_list1_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});