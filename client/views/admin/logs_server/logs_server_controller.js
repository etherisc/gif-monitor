this.AdminLogsServerController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminLogsServer': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.loglineListServerPagedExtraParams = {
			searchText: Session.get("LoglineListServerPagedSearchString") || "",
			searchFields: Session.get("LoglineListServerPagedSearchFields") || ["timestamp", "type", "source", "message", "args"],
			sortBy: Session.get("LoglineListServerPagedSortBy") || "",
			sortAscending: Session.get("LoglineListServerPagedSortAscending"),
			pageNo: Session.get("LoglineListServerPagedPageNo") || 0,
			pageSize: Session.get("LoglineListServerPagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("logline_list_server_paged", this.loglineListServerPagedExtraParams),
			Meteor.subscribe("logline_list_server_paged_count", this.loglineListServerPagedExtraParams)
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
			logline_list_server_paged: Logs.find(databaseUtils.extendFilter({source:"server"}, this.loglineListServerPagedExtraParams), databaseUtils.extendOptions({sort:{timestamp:-1}}, this.loglineListServerPagedExtraParams)),
			logline_list_server_paged_count: Counts.get("logline_list_server_paged_count")
		};
		

		
		data.logline_list_server_paged_page_count = this.loglineListServerPagedExtraParams && this.loglineListServerPagedExtraParams.pageSize ? Math.ceil(data.logline_list_server_paged_count / this.loglineListServerPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.loglineListServerPagedExtraParams.pageNo >= data.logline_list_server_paged_page_count) {
			Session.set("LoglineListServerPagedPageNo", data.logline_list_server_paged_page_count > 0 ? data.logline_list_server_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});