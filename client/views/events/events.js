Template.Events.onCreated(function() {
	
});

Template.Events.onDestroyed(function() {
	
});

Template.Events.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Events.events({
	
});

Template.Events.helpers({
	
});


var EventsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("EventListPagedSearchString") || "",
		searchFields: Session.get("EventListPagedSearchFields") || ["chain_id", "timestamp", "transaction_hash", "contract", "address", "event"],
		sortBy: Session.get("EventListPagedSortBy") || "",
		sortAscending: Session.get("EventListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("eventListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.EventsView.onCreated(function() {
	
});

Template.EventsView.onDestroyed(function() {
	
});

Template.EventsView.onRendered(function() {
	Session.set("EventsViewStyle", "table");
	
});

Template.EventsView.events({
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
				Session.set("EventListPagedSearchString", searchString);
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
					Session.set("EventListPagedSearchString", searchString);
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
					Session.set("EventListPagedSearchString", "");
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
		EventsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		EventsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		EventsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		EventsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("EventListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("EventListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("EventListPagedPageNo") || 0;
		if(currentPage < this.event_list_paged_page_count - 1) {
			Session.set("EventListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.EventsView.helpers({

	"insertButtonClass": function() {
		return Events.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.event_list_paged || this.event_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.event_list_paged && this.event_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.event_list_paged && this.event_list_paged.count() == 0 && Session.get("EventListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("EventListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("EventListPagedPageNo") || 0) < this.event_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("EventListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("EventsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("EventsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("EventsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("EventsViewStyle") == "gallery";
	}, 

	
	"CustomActionsShowCondition": function() {
		return userIsAdmin();

	}
});


Template.EventsViewTable.onCreated(function() {
	
});

Template.EventsViewTable.onDestroyed(function() {
	
});

Template.EventsViewTable.onRendered(function() {
	
});

Template.EventsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("EventListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("EventListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("EventListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("EventListPagedSortAscending", !sortAscending);
		} else {
			Session.set("EventListPagedSortAscending", true);
		}
	}
});

Template.EventsViewTable.helpers({
});


Template.EventsViewTableItems.onCreated(function() {
	
});

Template.EventsViewTableItems.onDestroyed(function() {
	
});

Template.EventsViewTableItems.onRendered(function() {
	
});

Template.EventsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("events.details", mergeObjects(Router.currentRouteParams(), {eventId: this._id}));
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

Template.EventsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Events.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Events.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.EventsViewCustomActions.created = function() {

};

Template.EventsViewCustomActions.destroyed = function() {

};

Template.EventsViewCustomActions.rendered = function() {

};

Template.EventsViewCustomActions.helpers({

});

Template.EventsViewCustomActions.events({
	"click #btn-reload": function (e,t) {
		e.preventDefault();

		Meteor.call('reloadEvents');
	}
});

