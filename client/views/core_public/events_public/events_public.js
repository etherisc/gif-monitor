Template.CorePublicEventsPublic.onCreated(function() {
	
});

Template.CorePublicEventsPublic.onDestroyed(function() {
	
});

Template.CorePublicEventsPublic.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CorePublicEventsPublic.events({
	
});

Template.CorePublicEventsPublic.helpers({
	
});


var CorePublicEventsPublicViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("EventListPublicPagedSearchString") || "",
		searchFields: Session.get("EventListPublicPagedSearchFields") || ["chain_id", "timestamp", "block_number", "transaction_hash", "log_index", "contract", "address", "event", "values"],
		sortBy: Session.get("EventListPublicPagedSortBy") || "",
		sortAscending: Session.get("EventListPublicPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("eventListPublicPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.CorePublicEventsPublicView.onCreated(function() {
	
});

Template.CorePublicEventsPublicView.onDestroyed(function() {
	
});

Template.CorePublicEventsPublicView.onRendered(function() {
	Session.set("CorePublicEventsPublicViewStyle", "table");
	
});

Template.CorePublicEventsPublicView.events({
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
				Session.set("EventListPublicPagedSearchString", searchString);
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
					Session.set("EventListPublicPagedSearchString", searchString);
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
					Session.set("EventListPublicPagedSearchString", "");
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
		CorePublicEventsPublicViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CorePublicEventsPublicViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CorePublicEventsPublicViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CorePublicEventsPublicViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("EventListPublicPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("EventListPublicPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("EventListPublicPagedPageNo") || 0;
		if(currentPage < this.event_list_public_paged_page_count - 1) {
			Session.set("EventListPublicPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.CorePublicEventsPublicView.helpers({

	"insertButtonClass": function() {
		return Events.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.event_list_public_paged || this.event_list_public_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.event_list_public_paged && this.event_list_public_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.event_list_public_paged && this.event_list_public_paged.count() == 0 && Session.get("EventListPublicPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("EventListPublicPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("EventListPublicPagedPageNo") || 0) < this.event_list_public_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("EventListPublicPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("CorePublicEventsPublicViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("CorePublicEventsPublicViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("CorePublicEventsPublicViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("CorePublicEventsPublicViewStyle") == "gallery";
	}

	
});


Template.CorePublicEventsPublicViewTable.onCreated(function() {
	
});

Template.CorePublicEventsPublicViewTable.onDestroyed(function() {
	
});

Template.CorePublicEventsPublicViewTable.onRendered(function() {
	
});

Template.CorePublicEventsPublicViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("EventListPublicPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("EventListPublicPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("EventListPublicPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("EventListPublicPagedSortAscending", !sortAscending);
		} else {
			Session.set("EventListPublicPagedSortAscending", true);
		}
	}
});

Template.CorePublicEventsPublicViewTable.helpers({
});


Template.CorePublicEventsPublicViewTableItems.onCreated(function() {
	
});

Template.CorePublicEventsPublicViewTableItems.onDestroyed(function() {
	
});

Template.CorePublicEventsPublicViewTableItems.onRendered(function() {
	
});

Template.CorePublicEventsPublicViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("core_public.events_public.details", mergeObjects(Router.currentRouteParams(), {eventId: this._id}));
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

Template.CorePublicEventsPublicViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Events.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Events.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
