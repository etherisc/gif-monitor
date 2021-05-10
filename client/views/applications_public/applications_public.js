Template.ApplicationsPublic.onCreated(function() {
	
});

Template.ApplicationsPublic.onDestroyed(function() {
	
});

Template.ApplicationsPublic.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ApplicationsPublic.events({
	
});

Template.ApplicationsPublic.helpers({
	
});


var ApplicationsPublicViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ApplicationListPagedSearchString") || "",
		searchFields: Session.get("ApplicationListPagedSearchFields") || ["application_id", "metadata_id", "premium", "currency", "payout_options", "state", "state_message", "created_at", "updated_at", "metadata_mongo_id"],
		sortBy: Session.get("ApplicationListPagedSortBy") || "",
		sortAscending: Session.get("ApplicationListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("applicationListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.ApplicationsPublicView.onCreated(function() {
	
});

Template.ApplicationsPublicView.onDestroyed(function() {
	
});

Template.ApplicationsPublicView.onRendered(function() {
	Session.set("ApplicationsPublicViewStyle", "table");
	
});

Template.ApplicationsPublicView.events({
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
				Session.set("ApplicationListPagedSearchString", searchString);
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
					Session.set("ApplicationListPagedSearchString", searchString);
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
					Session.set("ApplicationListPagedSearchString", "");
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
		ApplicationsPublicViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ApplicationsPublicViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ApplicationsPublicViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ApplicationsPublicViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("ApplicationListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ApplicationListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ApplicationListPagedPageNo") || 0;
		if(currentPage < this.application_list_paged_page_count - 1) {
			Session.set("ApplicationListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.ApplicationsPublicView.helpers({

	"insertButtonClass": function() {
		return Applications.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.application_list_paged || this.application_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.application_list_paged && this.application_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.application_list_paged && this.application_list_paged.count() == 0 && Session.get("ApplicationListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ApplicationListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ApplicationListPagedPageNo") || 0) < this.application_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ApplicationListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("ApplicationsPublicViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("ApplicationsPublicViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("ApplicationsPublicViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("ApplicationsPublicViewStyle") == "gallery";
	}

	
});


Template.ApplicationsPublicViewTable.onCreated(function() {
	
});

Template.ApplicationsPublicViewTable.onDestroyed(function() {
	
});

Template.ApplicationsPublicViewTable.onRendered(function() {
	
});

Template.ApplicationsPublicViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("ApplicationListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ApplicationListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ApplicationListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ApplicationListPagedSortAscending", !sortAscending);
		} else {
			Session.set("ApplicationListPagedSortAscending", true);
		}
	}
});

Template.ApplicationsPublicViewTable.helpers({
});


Template.ApplicationsPublicViewTableItems.onCreated(function() {
	
});

Template.ApplicationsPublicViewTableItems.onDestroyed(function() {
	
});

Template.ApplicationsPublicViewTableItems.onRendered(function() {
	
});

Template.ApplicationsPublicViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("applications_public.details", mergeObjects(Router.currentRouteParams(), {applicationId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("applicationsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("applicationsRemove", me._id, function(err, res) {
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

Template.ApplicationsPublicViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Applications.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Applications.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
