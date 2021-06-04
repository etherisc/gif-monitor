Template.Metadata.onCreated(function() {
	
});

Template.Metadata.onDestroyed(function() {
	
});

Template.Metadata.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Metadata.events({
	
});

Template.Metadata.helpers({
	
});


var MetadataViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("MetadataListPagedSearchString") || "",
		searchFields: Session.get("MetadataListPagedSearchFields") || ["bp_external_key", "product_id", "product_mongo_id", "application_id", "application_mongo_id", "policy_id", "policy_mongo_id", "claims_ids", "payout_ids", "has_policy", "has_application", "registry", "token", "release", "state", "state_message", "created_at", "updated_at"],
		sortBy: Session.get("MetadataListPagedSortBy") || "",
		sortAscending: Session.get("MetadataListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("metadataListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.MetadataView.onCreated(function() {
	
});

Template.MetadataView.onDestroyed(function() {
	
});

Template.MetadataView.onRendered(function() {
	Session.set("MetadataViewStyle", "table");
	
});

Template.MetadataView.events({
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
				Session.set("MetadataListPagedSearchString", searchString);
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
					Session.set("MetadataListPagedSearchString", searchString);
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
					Session.set("MetadataListPagedSearchString", "");
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
		MetadataViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		MetadataViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		MetadataViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		MetadataViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("MetadataListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("MetadataListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("MetadataListPagedPageNo") || 0;
		if(currentPage < this.metadata_list_paged_page_count - 1) {
			Session.set("MetadataListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.MetadataView.helpers({

	"insertButtonClass": function() {
		return Metadata.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.metadata_list_paged || this.metadata_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.metadata_list_paged && this.metadata_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.metadata_list_paged && this.metadata_list_paged.count() == 0 && Session.get("MetadataListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("MetadataListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("MetadataListPagedPageNo") || 0) < this.metadata_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("MetadataListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("MetadataViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("MetadataViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("MetadataViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("MetadataViewStyle") == "gallery";
	}

	
});


Template.MetadataViewTable.onCreated(function() {
	
});

Template.MetadataViewTable.onDestroyed(function() {
	
});

Template.MetadataViewTable.onRendered(function() {
	
});

Template.MetadataViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("MetadataListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("MetadataListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("MetadataListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("MetadataListPagedSortAscending", !sortAscending);
		} else {
			Session.set("MetadataListPagedSortAscending", true);
		}
	}
});

Template.MetadataViewTable.helpers({
});


Template.MetadataViewTableItems.onCreated(function() {
	
});

Template.MetadataViewTableItems.onDestroyed(function() {
	
});

Template.MetadataViewTableItems.onRendered(function() {
	
});

Template.MetadataViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("metadata.details", mergeObjects(Router.currentRouteParams(), {metadataId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("metadataUpdate", this._id, values, function(err, res) {
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
						Meteor.call("metadataRemove", me._id, function(err, res) {
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

Template.MetadataViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Metadata.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Metadata.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.MetadataViewCustomActions.created = function() {

};

Template.MetadataViewCustomActions.destroyed = function() {

};

Template.MetadataViewCustomActions.rendered = function() {

};

Template.MetadataViewCustomActions.helpers({

});

Template.MetadataViewCustomActions.events({
	"click #btn-reload": function (e,t) {
		e.preventDefault();

		Meteor.call('reload.metadata');
	}

});
