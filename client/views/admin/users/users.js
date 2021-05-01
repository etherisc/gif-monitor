Template.AdminUsers.onCreated(function() {
	
});

Template.AdminUsers.onDestroyed(function() {
	
});

Template.AdminUsers.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminUsers.events({
	
});

Template.AdminUsers.helpers({
	
});


var AdminUsersViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("AdminUsersPagedSearchString") || "",
		searchFields: Session.get("AdminUsersPagedSearchFields") || ["profile.name", "roles"],
		sortBy: Session.get("AdminUsersPagedSortBy") || "",
		sortAscending: Session.get("AdminUsersPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("adminUsersPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminUsersView.onCreated(function() {
	
});

Template.AdminUsersView.onDestroyed(function() {
	
});

Template.AdminUsersView.onRendered(function() {
	Session.set("AdminUsersViewStyle", "table");
	
});

Template.AdminUsersView.events({
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
				Session.set("AdminUsersPagedSearchString", searchString);
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
					Session.set("AdminUsersPagedSearchString", searchString);
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
					Session.set("AdminUsersPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.users.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminUsersViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminUsersViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminUsersViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminUsersViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("AdminUsersPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("AdminUsersPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("AdminUsersPagedPageNo") || 0;
		if(currentPage < this.admin_users_paged_page_count - 1) {
			Session.set("AdminUsersPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminUsersView.helpers({

	

	"isEmpty": function() {
		return !this.admin_users_paged || this.admin_users_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_users_paged && this.admin_users_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_users_paged && this.admin_users_paged.count() == 0 && Session.get("AdminUsersPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("AdminUsersPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("AdminUsersPagedPageNo") || 0) < this.admin_users_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("AdminUsersPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminUsersViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminUsersViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminUsersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminUsersViewStyle") == "gallery";
	}

	
});


Template.AdminUsersViewTable.onCreated(function() {
	
});

Template.AdminUsersViewTable.onDestroyed(function() {
	
});

Template.AdminUsersViewTable.onRendered(function() {
	
});

Template.AdminUsersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("AdminUsersPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("AdminUsersPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("AdminUsersPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("AdminUsersPagedSortAscending", !sortAscending);
		} else {
			Session.set("AdminUsersPagedSortAscending", true);
		}
	}
});

Template.AdminUsersViewTable.helpers({
});


Template.AdminUsersViewTableItems.onCreated(function() {
	
});

Template.AdminUsersViewTableItems.onDestroyed(function() {
	
});

Template.AdminUsersViewTableItems.onRendered(function() {
	
});

Template.AdminUsersViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("admin.users.details", mergeObjects(Router.currentRouteParams(), {userId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("usersUpdate", this._id, values, function(err, res) {
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
						Meteor.call("usersRemove", me._id, function(err, res) {
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
		Router.go("admin.users.edit", mergeObjects(Router.currentRouteParams(), {userId: this._id}));
		return false;
	}
});

Template.AdminUsersViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	}
});
