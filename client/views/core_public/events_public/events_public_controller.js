this.CorePublicEventsPublicController = RouteController.extend({
	template: "CorePublicEventsPublic",
	

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
		this.eventListPagedExtraParams = {
			searchText: Session.get("EventListPagedSearchString") || "",
			searchFields: Session.get("EventListPagedSearchFields") || ["chain_id", "timestamp", "block_number", "transaction_hash", "log_index", "contract", "address", "event", "values"],
			sortBy: Session.get("EventListPagedSortBy") || "",
			sortAscending: Session.get("EventListPagedSortAscending"),
			pageNo: Session.get("EventListPagedPageNo") || 0,
			pageSize: Session.get("EventListPagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("event_list_paged", this.eventListPagedExtraParams),
			Meteor.subscribe("event_list_paged_count", this.eventListPagedExtraParams)
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
			event_list_paged: Events.find(databaseUtils.extendFilter({}, this.eventListPagedExtraParams), databaseUtils.extendOptions({sort:{timestamp:-1}}, this.eventListPagedExtraParams)),
			event_list_paged_count: Counts.get("event_list_paged_count")
		};
		

		
		data.event_list_paged_page_count = this.eventListPagedExtraParams && this.eventListPagedExtraParams.pageSize ? Math.ceil(data.event_list_paged_count / this.eventListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.eventListPagedExtraParams.pageNo >= data.event_list_paged_page_count) {
			Session.set("EventListPagedPageNo", data.event_list_paged_page_count > 0 ? data.event_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});