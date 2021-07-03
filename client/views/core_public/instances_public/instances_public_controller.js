this.CorePublicInstancesPublicController = RouteController.extend({
	template: "CorePublicInstancesPublic",
	

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
		this.instanceListPagedExtraParams = {
			searchText: Session.get("InstanceListPagedSearchString") || "",
			searchFields: Session.get("InstanceListPagedSearchFields") || ["name", "chain", "chain_id", "registry_addr"],
			sortBy: Session.get("InstanceListPagedSortBy") || "",
			sortAscending: Session.get("InstanceListPagedSortAscending"),
			pageNo: Session.get("InstanceListPagedPageNo") || 0,
			pageSize: Session.get("InstanceListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("instance_list_paged", this.instanceListPagedExtraParams),
			Meteor.subscribe("instance_list_paged_count", this.instanceListPagedExtraParams)
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
			instance_list_paged: Instances.find(databaseUtils.extendFilter({}, this.instanceListPagedExtraParams), databaseUtils.extendOptions({sort:["name","asc"]}, this.instanceListPagedExtraParams)),
			instance_list_paged_count: Counts.get("instance_list_paged_count")
		};
		

		
		data.instance_list_paged_page_count = this.instanceListPagedExtraParams && this.instanceListPagedExtraParams.pageSize ? Math.ceil(data.instance_list_paged_count / this.instanceListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.instanceListPagedExtraParams.pageNo >= data.instance_list_paged_page_count) {
			Session.set("InstanceListPagedPageNo", data.instance_list_paged_page_count > 0 ? data.instance_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});