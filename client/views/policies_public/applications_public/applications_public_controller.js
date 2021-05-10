this.PoliciesPublicApplicationsPublicController = RouteController.extend({
	template: "PoliciesPublic",
	

	yieldTemplates: {
		'PoliciesPublicApplicationsPublic': { to: 'PoliciesPublicSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("PoliciesPublic"); this.render("loading", { to: "PoliciesPublicSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.applicationListPagedExtraParams = {
			searchText: Session.get("ApplicationListPagedSearchString") || "",
			searchFields: Session.get("ApplicationListPagedSearchFields") || ["application_id", "metadata_id", "premium", "currency", "payout_options", "state", "state_message", "created_at", "updated_at", "metadata_mongo_id"],
			sortBy: Session.get("ApplicationListPagedSortBy") || "",
			sortAscending: Session.get("ApplicationListPagedSortAscending"),
			pageNo: Session.get("ApplicationListPagedPageNo") || 0,
			pageSize: Session.get("ApplicationListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("application_list_paged", this.applicationListPagedExtraParams),
			Meteor.subscribe("application_list_paged_count", this.applicationListPagedExtraParams)
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
			application_list_paged: Applications.find(databaseUtils.extendFilter({}, this.applicationListPagedExtraParams), databaseUtils.extendOptions({}, this.applicationListPagedExtraParams)),
			application_list_paged_count: Counts.get("application_list_paged_count")
		};
		

		
		data.application_list_paged_page_count = this.applicationListPagedExtraParams && this.applicationListPagedExtraParams.pageSize ? Math.ceil(data.application_list_paged_count / this.applicationListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.applicationListPagedExtraParams.pageNo >= data.application_list_paged_page_count) {
			Session.set("ApplicationListPagedPageNo", data.application_list_paged_page_count > 0 ? data.application_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});