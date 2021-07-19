Template.Oracles.onCreated(function() {
	
});

Template.Oracles.onDestroyed(function() {
	
});

Template.Oracles.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Oracles.events({
	
});

Template.Oracles.helpers({
	
});


var OraclesViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("OracleListPagedSearchString") || "",
		searchFields: Session.get("OracleListPagedSearchFields") || ["oracle_id", "description", "oracle_contract", "oracle_owner", "activated", "active_oracle_types"],
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

Template.OraclesView.onCreated(function() {
	
});

Template.OraclesView.onDestroyed(function() {
	
});

Template.OraclesView.onRendered(function() {
	Session.set("OraclesViewStyle", "table");
	
});

Template.OraclesView.events({
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
		OraclesViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		OraclesViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		OraclesViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		OraclesViewExport.call(this, "json");
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

Template.OraclesView.helpers({

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
		return Session.get("OraclesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("OraclesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("OraclesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("OraclesViewStyle") == "gallery";
	}, 

	
	"CustomActionsShowCondition": function() {
		return userIsAdmin();

	}
});


Template.OraclesViewTable.onCreated(function() {
	
});

Template.OraclesViewTable.onDestroyed(function() {
	
});

Template.OraclesViewTable.onRendered(function() {
	
});

Template.OraclesViewTable.events({
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

Template.OraclesViewTable.helpers({
});


Template.OraclesViewTableItems.onCreated(function() {
	
});

Template.OraclesViewTableItems.onDestroyed(function() {
	
});

Template.OraclesViewTableItems.onRendered(function() {
	
});

Template.OraclesViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("oracles.details", mergeObjects(Router.currentRouteParams(), {oracleId: this._id}));
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

Template.OraclesViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Oracles.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Oracles.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.OraclesViewCustomActions.created = function() {

};

Template.OraclesViewCustomActions.destroyed = function() {

};

Template.OraclesViewCustomActions.rendered = function() {

};

Template.OraclesViewCustomActions.helpers({

});

Template.OraclesViewCustomActions.events({
	"click #btn-reload": function (e,t) {
		e.preventDefault();

		Meteor.call('reloadOracles');
	}
});

