this.AdminLogsBrowserController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminLogsBrowser': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.loglineListBrowserPagedExtraParams = {
			searchText: Session.get("LoglineListBrowserPagedSearchString") || "",
			searchFields: Session.get("LoglineListBrowserPagedSearchFields") || ["timestamp", "type", "source", "message", "args"],
			sortBy: Session.get("LoglineListBrowserPagedSortBy") || "",
			sortAscending: Session.get("LoglineListBrowserPagedSortAscending"),
			pageNo: Session.get("LoglineListBrowserPagedPageNo") || 0,
			pageSize: Session.get("LoglineListBrowserPagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("logline_list_browser_paged", this.loglineListBrowserPagedExtraParams),
			Meteor.subscribe("logline_list_browser_paged_count", this.loglineListBrowserPagedExtraParams)
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
			logline_list_browser_paged: Logs.find(databaseUtils.extendFilter({source:"browser"}, this.loglineListBrowserPagedExtraParams), databaseUtils.extendOptions({sort:{timestamp:-1}}, this.loglineListBrowserPagedExtraParams)),
			logline_list_browser_paged_count: Counts.get("logline_list_browser_paged_count")
		};
		

		
		data.logline_list_browser_paged_page_count = this.loglineListBrowserPagedExtraParams && this.loglineListBrowserPagedExtraParams.pageSize ? Math.ceil(data.logline_list_browser_paged_count / this.loglineListBrowserPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.loglineListBrowserPagedExtraParams.pageNo >= data.logline_list_browser_paged_page_count) {
			Session.set("LoglineListBrowserPagedPageNo", data.logline_list_browser_paged_page_count > 0 ? data.logline_list_browser_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});