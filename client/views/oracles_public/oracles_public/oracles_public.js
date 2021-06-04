Template.OraclesPublicOraclesPublic.onCreated(function() {
	
});

Template.OraclesPublicOraclesPublic.onDestroyed(function() {
	
});

Template.OraclesPublicOraclesPublic.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.OraclesPublicOraclesPublic.events({
	
});

Template.OraclesPublicOraclesPublic.helpers({
	
});


var OraclesPublicOraclesPublicViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("OracleListPagedSearchString") || "",
		searchFields: Session.get("OracleListPagedSearchFields") || ["oracle_id", "description", "oracle_contract", "oracle_owner", "active_oracle_types"],
		sortBy: Session.get("OracleListPagedSortBy") || "",
		sortAscending: Session.get("OracleListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("oracleListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.OraclesPublicOraclesPublicView.onCreated(function() {
	
});

Template.OraclesPublicOraclesPublicView.onDestroyed(function() {
	
});

Template.OraclesPublicOraclesPublicView.onRendered(function() {
	Session.set("OraclesPublicOraclesPublicViewStyle", "table");
	
});

Template.OraclesPublicOraclesPublicView.events({
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
				Session.set("OracleListPagedSearchString", searchString);
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
					Session.set("OracleListPagedSearchString", searchString);
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
					Session.set("OracleListPagedSearchString", "");
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
		OraclesPublicOraclesPublicViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		OraclesPublicOraclesPublicViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		OraclesPublicOraclesPublicViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		OraclesPublicOraclesPublicViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("OracleListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("OracleListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("OracleListPagedPageNo") || 0;
		if(currentPage < this.oracle_list_paged_page_count - 1) {
			Session.set("OracleListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.OraclesPublicOraclesPublicView.helpers({

	"insertButtonClass": function() {
		return Oracles.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.oracle_list_paged || this.oracle_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.oracle_list_paged && this.oracle_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.oracle_list_paged && this.oracle_list_paged.count() == 0 && Session.get("OracleListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("OracleListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("OracleListPagedPageNo") || 0) < this.oracle_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("OracleListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("OraclesPublicOraclesPublicViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("OraclesPublicOraclesPublicViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("OraclesPublicOraclesPublicViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("OraclesPublicOraclesPublicViewStyle") == "gallery";
	}

	
});


Template.OraclesPublicOraclesPublicViewTable.onCreated(function() {
	
});

Template.OraclesPublicOraclesPublicViewTable.onDestroyed(function() {
	
});

Template.OraclesPublicOraclesPublicViewTable.onRendered(function() {
	
});

Template.OraclesPublicOraclesPublicViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("OracleListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("OracleListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("OracleListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("OracleListPagedSortAscending", !sortAscending);
		} else {
			Session.set("OracleListPagedSortAscending", true);
		}
	}
});

Template.OraclesPublicOraclesPublicViewTable.helpers({
});


Template.OraclesPublicOraclesPublicViewTableItems.onCreated(function() {
	
});

Template.OraclesPublicOraclesPublicViewTableItems.onDestroyed(function() {
	
});

Template.OraclesPublicOraclesPublicViewTableItems.onRendered(function() {
	
});

Template.OraclesPublicOraclesPublicViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("oracles_public.oracles_public.details", mergeObjects(Router.currentRouteParams(), {oracleId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("oraclesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("oraclesRemove", me._id, function(err, res) {
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

Template.OraclesPublicOraclesPublicViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Oracles.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Oracles.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

