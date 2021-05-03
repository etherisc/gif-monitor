Template.CoreEvents.onCreated(function() {
	
});

Template.CoreEvents.onDestroyed(function() {
	
});

Template.CoreEvents.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CoreEvents.events({
	
});

Template.CoreEvents.helpers({
	
});


var CoreEventsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("EventList1PagedSearchString") || "",
		searchFields: Session.get("EventList1PagedSearchFields") || ["chain_id", "block_number", "transaction_hash", "log_index", "contract", "address", "event", "values", "timestamp"],
		sortBy: Session.get("EventList1PagedSortBy") || "",
		sortAscending: Session.get("EventList1PagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("eventList1PagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.CoreEventsView.onCreated(function() {
	
});

Template.CoreEventsView.onDestroyed(function() {
	
});

Template.CoreEventsView.onRendered(function() {
	Session.set("CoreEventsViewStyle", "table");
	
});

Template.CoreEventsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).closest("form");
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				Session.set("EventList1PagedSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					Session.set("EventList1PagedSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					Session.set("EventList1PagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		CoreEventsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CoreEventsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CoreEventsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CoreEventsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("EventList1PagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("EventList1PagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("EventList1PagedPageNo") || 0;
		if(currentPage < this.event_list1paged_page_count - 1) {
			Session.set("EventList1PagedPageNo", currentPage + 1);
		}
	}

	
});

Template.CoreEventsView.helpers({

	"insertButtonClass": function() {
		return Events.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.event_list1_paged || this.event_list1_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.event_list1_paged && this.event_list1_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.event_list1_paged && this.event_list1_paged.count() == 0 && Session.get("EventList1PagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("EventList1PagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("EventList1PagedPageNo") || 0) < this.event_list1paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("EventList1PagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("CoreEventsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("CoreEventsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("CoreEventsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("CoreEventsViewStyle") == "gallery";
	}

	
});


Template.CoreEventsViewTable.onCreated(function() {
	
});

Template.CoreEventsViewTable.onDestroyed(function() {
	
});

Template.CoreEventsViewTable.onRendered(function() {
	
});

Template.CoreEventsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("EventList1PagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("EventList1PagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("EventList1PagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("EventList1PagedSortAscending", !sortAscending);
		} else {
			Session.set("EventList1PagedSortAscending", true);
		}
	}
});

Template.CoreEventsViewTable.helpers({
});


Template.CoreEventsViewTableItems.onCreated(function() {
	
});

Template.CoreEventsViewTableItems.onDestroyed(function() {
	
});

Template.CoreEventsViewTableItems.onRendered(function() {
	
});

Template.CoreEventsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("core.events.details", mergeObjects(Router.currentRouteParams(), {eventId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("eventsUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("eventsRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		/**/
		return false;
	}
});

Template.CoreEventsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Events.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Events.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
