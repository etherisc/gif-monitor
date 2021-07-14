Template.Applications.onCreated(function() {
	
});

Template.Applications.onDestroyed(function() {
	
});

Template.Applications.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Applications.events({
	
});

Template.Applications.helpers({
	
});


var ApplicationsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ApplicationListPagedSearchString") || "",
		searchFields: Session.get("ApplicationListPagedSearchFields") || ["bp_key", "metadata_mongo_id", "data", "state", "created_at", "updated_at"],
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

Template.ApplicationsView.onCreated(function() {
	
});

Template.ApplicationsView.onDestroyed(function() {
	
});

Template.ApplicationsView.onRendered(function() {
	Session.set("ApplicationsViewStyle", "table");
	
});

Template.ApplicationsView.events({
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
		ApplicationsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ApplicationsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ApplicationsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ApplicationsViewExport.call(this, "json");
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

Template.ApplicationsView.helpers({

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
		return Session.get("ApplicationsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("ApplicationsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("ApplicationsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("ApplicationsViewStyle") == "gallery";
	}

	
});


Template.ApplicationsViewTable.onCreated(function() {
	
});

Template.ApplicationsViewTable.onDestroyed(function() {
	
});

Template.ApplicationsViewTable.onRendered(function() {
	
});

Template.ApplicationsViewTable.events({
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

Template.ApplicationsViewTable.helpers({
});


Template.ApplicationsViewTableItems.onCreated(function() {
	
});

Template.ApplicationsViewTableItems.onDestroyed(function() {
	
});

Template.ApplicationsViewTableItems.onRendered(function() {
	
});

Template.ApplicationsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("applications.details", mergeObjects(Router.currentRouteParams(), {applicationId: this._id}));
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

Template.ApplicationsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Applications.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Applications.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.ApplicationsViewCustomActions.created = function() {

};

Template.ApplicationsViewCustomActions.destroyed = function() {

};

Template.ApplicationsViewCustomActions.rendered = function() {

};

Template.ApplicationsViewCustomActions.helpers({

});

Template.ApplicationsViewCustomActions.events({
	"click #btn-reload": function (e,t) {
		e.preventDefault();

		Meteor.call('reload.applications');
	}

});
