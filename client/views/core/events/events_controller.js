this.CoreEventsController = RouteController.extend({
	template: "Core",
	

	yieldTemplates: {
		'CoreEvents': { to: 'CoreSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Core"); this.render("loading", { to: "CoreSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.eventList1PagedExtraParams = {
			searchText: Session.get("EventList1PagedSearchString") || "",
			searchFields: Session.get("EventList1PagedSearchFields") || ["chain_id", "timestamp", "block_number", "transaction_hash", "log_index", "contract", "address", "event", "values"],
			sortBy: Session.get("EventList1PagedSortBy") || "",
			sortAscending: Session.get("EventList1PagedSortAscending"),
			pageNo: Session.get("EventList1PagedPageNo") || 0,
			pageSize: Session.get("EventList1PagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("event_list1_paged", this.eventList1PagedExtraParams),
			Meteor.subscribe("event_list1_paged_count", this.eventList1PagedExtraParams)
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
			event_list1_paged: Events.find(databaseUtils.extendFilter({}, this.eventList1PagedExtraParams), databaseUtils.extendOptions({}, this.eventList1PagedExtraParams)),
			event_list1_paged_count: Counts.get("event_list1_paged_count")
		};
		

		
		data.event_list1_paged_page_count = this.eventList1PagedExtraParams && this.eventList1PagedExtraParams.pageSize ? Math.ceil(data.event_list1_paged_count / this.eventList1PagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.eventList1PagedExtraParams.pageNo >= data.event_list1_paged_page_count) {
			Session.set("EventList1PagedPageNo", data.event_list1_paged_page_count > 0 ? data.event_list1_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});