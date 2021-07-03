this.AdminSettingsPageController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminSettingsPage': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.settingListPagedExtraParams = {
			searchText: Session.get("SettingListPagedSearchString") || "",
			searchFields: Session.get("SettingListPagedSearchFields") || ["key", "value"],
			sortBy: Session.get("SettingListPagedSortBy") || "",
			sortAscending: Session.get("SettingListPagedSortAscending"),
			pageNo: Session.get("SettingListPagedPageNo") || 0,
			pageSize: Session.get("SettingListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("setting_list_paged", this.settingListPagedExtraParams),
			Meteor.subscribe("setting_list_paged_count", this.settingListPagedExtraParams)
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
			setting_list_paged: Settings.find(databaseUtils.extendFilter({}, this.settingListPagedExtraParams), databaseUtils.extendOptions({}, this.settingListPagedExtraParams)),
			setting_list_paged_count: Counts.get("setting_list_paged_count")
		};
		

		
		data.setting_list_paged_page_count = this.settingListPagedExtraParams && this.settingListPagedExtraParams.pageSize ? Math.ceil(data.setting_list_paged_count / this.settingListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.settingListPagedExtraParams.pageNo >= data.setting_list_paged_page_count) {
			Session.set("SettingListPagedPageNo", data.setting_list_paged_page_count > 0 ? data.setting_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});