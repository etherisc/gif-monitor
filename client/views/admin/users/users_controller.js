this.AdminUsersController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminUsers': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.adminUsersPagedExtraParams = {
			searchText: Session.get("AdminUsersPagedSearchString") || "",
			searchFields: Session.get("AdminUsersPagedSearchFields") || ["profile.name", "roles"],
			sortBy: Session.get("AdminUsersPagedSortBy") || "",
			sortAscending: Session.get("AdminUsersPagedSortAscending"),
			pageNo: Session.get("AdminUsersPagedPageNo") || 0,
			pageSize: Session.get("AdminUsersPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("admin_users_paged", this.adminUsersPagedExtraParams),
			Meteor.subscribe("admin_users_paged_count", this.adminUsersPagedExtraParams)
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
			admin_users_paged: Users.find(databaseUtils.extendFilter({}, this.adminUsersPagedExtraParams), databaseUtils.extendOptions({}, this.adminUsersPagedExtraParams)),
			admin_users_paged_count: Counts.get("admin_users_paged_count")
		};
		

		
		data.admin_users_paged_page_count = this.adminUsersPagedExtraParams && this.adminUsersPagedExtraParams.pageSize ? Math.ceil(data.admin_users_paged_count / this.adminUsersPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.adminUsersPagedExtraParams.pageNo >= data.admin_users_paged_page_count) {
			Session.set("AdminUsersPagedPageNo", data.admin_users_paged_page_count > 0 ? data.admin_users_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});