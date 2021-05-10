Template.PoliciesPublic.onCreated(function() {
	
});

Template.PoliciesPublic.onDestroyed(function() {
	
});

Template.PoliciesPublic.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PoliciesPublic.events({
	
});

Template.PoliciesPublic.helpers({
	
});


var PoliciesPublicViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("PolicyListPagedSearchString") || "",
		searchFields: Session.get("PolicyListPagedSearchFields") || ["policy_id", "metadata_id", "state", "state_message", "created_at", "updated_at", "metadata_mongo_id"],
		sortBy: Session.get("PolicyListPagedSortBy") || "",
		sortAscending: Session.get("PolicyListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("policyListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.PoliciesPublicView.onCreated(function() {
	
});

Template.PoliciesPublicView.onDestroyed(function() {
	
});

Template.PoliciesPublicView.onRendered(function() {
	Session.set("PoliciesPublicViewStyle", "table");
	
});

Template.PoliciesPublicView.events({
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
				Session.set("PolicyListPagedSearchString", searchString);
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
					Session.set("PolicyListPagedSearchString", searchString);
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
					Session.set("PolicyListPagedSearchString", "");
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
		PoliciesPublicViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PoliciesPublicViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PoliciesPublicViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PoliciesPublicViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("PolicyListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("PolicyListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("PolicyListPagedPageNo") || 0;
		if(currentPage < this.policy_list_paged_page_count - 1) {
			Session.set("PolicyListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.PoliciesPublicView.helpers({

	"insertButtonClass": function() {
		return Policies.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.policy_list_paged || this.policy_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.policy_list_paged && this.policy_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.policy_list_paged && this.policy_list_paged.count() == 0 && Session.get("PolicyListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("PolicyListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("PolicyListPagedPageNo") || 0) < this.policy_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("PolicyListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("PoliciesPublicViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("PoliciesPublicViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("PoliciesPublicViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("PoliciesPublicViewStyle") == "gallery";
	}

	
});


Template.PoliciesPublicViewTable.onCreated(function() {
	
});

Template.PoliciesPublicViewTable.onDestroyed(function() {
	
});

Template.PoliciesPublicViewTable.onRendered(function() {
	
});

Template.PoliciesPublicViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("PolicyListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("PolicyListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("PolicyListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("PolicyListPagedSortAscending", !sortAscending);
		} else {
			Session.set("PolicyListPagedSortAscending", true);
		}
	}
});

Template.PoliciesPublicViewTable.helpers({
});


Template.PoliciesPublicViewTableItems.onCreated(function() {
	
});

Template.PoliciesPublicViewTableItems.onDestroyed(function() {
	
});

Template.PoliciesPublicViewTableItems.onRendered(function() {
	
});

Template.PoliciesPublicViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("policies_public.details", mergeObjects(Router.currentRouteParams(), {policyId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("policiesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("policiesRemove", me._id, function(err, res) {
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

Template.PoliciesPublicViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Policies.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Policies.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
