this.AdminLogsAnalyticsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminLogsAnalytics': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.loglineListAnalyticsPagedExtraParams = {
			searchText: Session.get("LoglineListAnalyticsPagedSearchString") || "",
			searchFields: Session.get("LoglineListAnalyticsPagedSearchFields") || ["timestamp", "type", "source", "message", "args"],
			sortBy: Session.get("LoglineListAnalyticsPagedSortBy") || "",
			sortAscending: Session.get("LoglineListAnalyticsPagedSortAscending"),
			pageNo: Session.get("LoglineListAnalyticsPagedPageNo") || 0,
			pageSize: Session.get("LoglineListAnalyticsPagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("logline_list_analytics_paged", this.loglineListAnalyticsPagedExtraParams),
			Meteor.subscribe("logline_list_analytics_paged_count", this.loglineListAnalyticsPagedExtraParams)
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
			logline_list_analytics_paged: Logs.find(databaseUtils.extendFilter({source:"analytics"}, this.loglineListAnalyticsPagedExtraParams), databaseUtils.extendOptions({sort:{timestamp:-1}}, this.loglineListAnalyticsPagedExtraParams)),
			logline_list_analytics_paged_count: Counts.get("logline_list_analytics_paged_count")
		};
		

		
		data.logline_list_analytics_paged_page_count = this.loglineListAnalyticsPagedExtraParams && this.loglineListAnalyticsPagedExtraParams.pageSize ? Math.ceil(data.logline_list_analytics_paged_count / this.loglineListAnalyticsPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.loglineListAnalyticsPagedExtraParams.pageNo >= data.logline_list_analytics_paged_page_count) {
			Session.set("LoglineListAnalyticsPagedPageNo", data.logline_list_analytics_paged_page_count > 0 ? data.logline_list_analytics_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});