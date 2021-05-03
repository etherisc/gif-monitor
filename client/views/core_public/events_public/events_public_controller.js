this.CorePublicEventsPublicController = RouteController.extend({
	template: "CorePublic",
	

	yieldTemplates: {
		'CorePublicEventsPublic': { to: 'CorePublicSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("CorePublic"); this.render("loading", { to: "CorePublicSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.eventListPublicPagedExtraParams = {
			searchText: Session.get("EventListPublicPagedSearchString") || "",
			searchFields: Session.get("EventListPublicPagedSearchFields") || ["chain_id", "timestamp", "block_number", "transaction_hash", "log_index", "contract", "address", "event", "values"],
			sortBy: Session.get("EventListPublicPagedSortBy") || "",
			sortAscending: Session.get("EventListPublicPagedSortAscending"),
			pageNo: Session.get("EventListPublicPagedPageNo") || 0,
			pageSize: Session.get("EventListPublicPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("event_list_public_paged", this.eventListPublicPagedExtraParams),
			Meteor.subscribe("event_list_public_paged_count", this.eventListPublicPagedExtraParams)
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
			event_list_public_paged: Events.find(databaseUtils.extendFilter({}, this.eventListPublicPagedExtraParams), databaseUtils.extendOptions({sort:{timestamp:-1}}, this.eventListPublicPagedExtraParams)),
			event_list_public_paged_count: Counts.get("event_list_public_paged_count")
		};
		

		
		data.event_list_public_paged_page_count = this.eventListPublicPagedExtraParams && this.eventListPublicPagedExtraParams.pageSize ? Math.ceil(data.event_list_public_paged_count / this.eventListPublicPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.eventListPublicPagedExtraParams.pageNo >= data.event_list_public_paged_page_count) {
			Session.set("EventListPublicPagedPageNo", data.event_list_public_paged_page_count > 0 ? data.event_list_public_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});