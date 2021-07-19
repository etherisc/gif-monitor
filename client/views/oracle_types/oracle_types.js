Template.OracleTypes.onCreated(function() {
	
});

Template.OracleTypes.onDestroyed(function() {
	
});

Template.OracleTypes.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.OracleTypes.events({
	
});

Template.OracleTypes.helpers({
	
});


var OracleTypesViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("OracleTypeListPagedSearchString") || "",
		searchFields: Session.get("OracleTypeListPagedSearchFields") || ["name", "initialized", "activated", "input_format", "callback_format", "active_oracles", "assigned_oracles", "index"],
		sortBy: Session.get("OracleTypeListPagedSortBy") || "",
		sortAscending: Session.get("OracleTypeListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("oracleTypeListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.OracleTypesView.onCreated(function() {
	
});

Template.OracleTypesView.onDestroyed(function() {
	
});

Template.OracleTypesView.onRendered(function() {
	Session.set("OracleTypesViewStyle", "table");
	
});

Template.OracleTypesView.events({
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
				Session.set("OracleTypeListPagedSearchString", searchString);
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
					Session.set("OracleTypeListPagedSearchString", searchString);
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
					Session.set("OracleTypeListPagedSearchString", "");
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
		OracleTypesViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		OracleTypesViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		OracleTypesViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		OracleTypesViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("OracleTypeListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("OracleTypeListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("OracleTypeListPagedPageNo") || 0;
		if(currentPage < this.oracle_type_list_paged_page_count - 1) {
			Session.set("OracleTypeListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.OracleTypesView.helpers({

	"insertButtonClass": function() {
		return OracleTypes.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.oracle_type_list_paged || this.oracle_type_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.oracle_type_list_paged && this.oracle_type_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.oracle_type_list_paged && this.oracle_type_list_paged.count() == 0 && Session.get("OracleTypeListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("OracleTypeListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("OracleTypeListPagedPageNo") || 0) < this.oracle_type_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("OracleTypeListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("OracleTypesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("OracleTypesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("OracleTypesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("OracleTypesViewStyle") == "gallery";
	}

	
});


Template.OracleTypesViewTable.onCreated(function() {
	
});

Template.OracleTypesViewTable.onDestroyed(function() {
	
});

Template.OracleTypesViewTable.onRendered(function() {
	
});

Template.OracleTypesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("OracleTypeListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("OracleTypeListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("OracleTypeListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("OracleTypeListPagedSortAscending", !sortAscending);
		} else {
			Session.set("OracleTypeListPagedSortAscending", true);
		}
	}
});

Template.OracleTypesViewTable.helpers({
});


Template.OracleTypesViewTableItems.onCreated(function() {
	
});

Template.OracleTypesViewTableItems.onDestroyed(function() {
	
});

Template.OracleTypesViewTableItems.onRendered(function() {
	
});

Template.OracleTypesViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("oracle_types.details", mergeObjects(Router.currentRouteParams(), {oracleTypeId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("oracleTypesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("oracleTypesRemove", me._id, function(err, res) {
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

Template.OracleTypesViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return OracleTypes.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return OracleTypes.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.OracleTypesViewCustomActions.created = function() {

};

Template.OracleTypesViewCustomActions.destroyed = function() {

};

Template.OracleTypesViewCustomActions.rendered = function() {

};

Template.OracleTypesViewCustomActions.helpers({

});

Template.OracleTypesViewCustomActions.events({
	"click #btn-propose-oracletype": function (e,t) {
		e.preventDefault();

		proposeOracleType();
	},
	"click #btn-reload": function (e,t) {
		e.preventDefault();

		Meteor.call('reloadOracleTypes');
	}


});

