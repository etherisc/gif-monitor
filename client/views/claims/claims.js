Template.Claims.onCreated(function() {
	
});

Template.Claims.onDestroyed(function() {
	
});

Template.Claims.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Claims.events({
	
});

Template.Claims.helpers({
	
});


var ClaimsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ClaimListPagedSearchString") || "",
		searchFields: Session.get("ClaimListPagedSearchFields") || ["claim_id", "metadata_mongo_id", "bp_key", "data", "state", "state_message", "created_at", "updated_at"],
		sortBy: Session.get("ClaimListPagedSortBy") || "",
		sortAscending: Session.get("ClaimListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("claimListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.ClaimsView.onCreated(function() {
	
});

Template.ClaimsView.onDestroyed(function() {
	
});

Template.ClaimsView.onRendered(function() {
	Session.set("ClaimsViewStyle", "table");
	
});

Template.ClaimsView.events({
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
				Session.set("ClaimListPagedSearchString", searchString);
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
					Session.set("ClaimListPagedSearchString", searchString);
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
					Session.set("ClaimListPagedSearchString", "");
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
		ClaimsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ClaimsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ClaimsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ClaimsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("ClaimListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ClaimListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ClaimListPagedPageNo") || 0;
		if(currentPage < this.claim_list_paged_page_count - 1) {
			Session.set("ClaimListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.ClaimsView.helpers({

	"insertButtonClass": function() {
		return Claims.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.claim_list_paged || this.claim_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.claim_list_paged && this.claim_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.claim_list_paged && this.claim_list_paged.count() == 0 && Session.get("ClaimListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ClaimListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ClaimListPagedPageNo") || 0) < this.claim_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ClaimListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("ClaimsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("ClaimsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("ClaimsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("ClaimsViewStyle") == "gallery";
	}

	
});


Template.ClaimsViewTable.onCreated(function() {
	
});

Template.ClaimsViewTable.onDestroyed(function() {
	
});

Template.ClaimsViewTable.onRendered(function() {
	
});

Template.ClaimsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("ClaimListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ClaimListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ClaimListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ClaimListPagedSortAscending", !sortAscending);
		} else {
			Session.set("ClaimListPagedSortAscending", true);
		}
	}
});

Template.ClaimsViewTable.helpers({
});


Template.ClaimsViewTableItems.onCreated(function() {
	
});

Template.ClaimsViewTableItems.onDestroyed(function() {
	
});

Template.ClaimsViewTableItems.onRendered(function() {
	
});

Template.ClaimsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("claims.details", mergeObjects(Router.currentRouteParams(), {claimId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("claimsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("claimsRemove", me._id, function(err, res) {
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

Template.ClaimsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Claims.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Claims.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
