Template.AdminSettingsPage.onCreated(function() {
	
});

Template.AdminSettingsPage.onDestroyed(function() {
	
});

Template.AdminSettingsPage.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminSettingsPage.events({
	
});

Template.AdminSettingsPage.helpers({
	
});


var AdminSettingsPageViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("SettingListPagedSearchString") || "",
		searchFields: Session.get("SettingListPagedSearchFields") || ["key", "value"],
		sortBy: Session.get("SettingListPagedSortBy") || "",
		sortAscending: Session.get("SettingListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("settingListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminSettingsPageView.onCreated(function() {
	
});

Template.AdminSettingsPageView.onDestroyed(function() {
	
});

Template.AdminSettingsPageView.onRendered(function() {
	Session.set("AdminSettingsPageViewStyle", "table");
	
});

Template.AdminSettingsPageView.events({
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
				Session.set("SettingListPagedSearchString", searchString);
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
					Session.set("SettingListPagedSearchString", searchString);
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
					Session.set("SettingListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.settings_page.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminSettingsPageViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminSettingsPageViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminSettingsPageViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminSettingsPageViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("SettingListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("SettingListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("SettingListPagedPageNo") || 0;
		if(currentPage < this.setting_list_paged_page_count - 1) {
			Session.set("SettingListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminSettingsPageView.helpers({

	"insertButtonClass": function() {
		return Settings.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.setting_list_paged || this.setting_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.setting_list_paged && this.setting_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.setting_list_paged && this.setting_list_paged.count() == 0 && Session.get("SettingListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("SettingListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("SettingListPagedPageNo") || 0) < this.setting_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("SettingListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminSettingsPageViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminSettingsPageViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminSettingsPageViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminSettingsPageViewStyle") == "gallery";
	}

	
});


Template.AdminSettingsPageViewTable.onCreated(function() {
	
});

Template.AdminSettingsPageViewTable.onDestroyed(function() {
	
});

Template.AdminSettingsPageViewTable.onRendered(function() {
	
});

Template.AdminSettingsPageViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("SettingListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("SettingListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("SettingListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("SettingListPagedSortAscending", !sortAscending);
		} else {
			Session.set("SettingListPagedSortAscending", true);
		}
	}
});

Template.AdminSettingsPageViewTable.helpers({
});


Template.AdminSettingsPageViewTableItems.onCreated(function() {
	
});

Template.AdminSettingsPageViewTableItems.onDestroyed(function() {
	
});

Template.AdminSettingsPageViewTableItems.onRendered(function() {
	
});

Template.AdminSettingsPageViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("admin.settings_page.details", mergeObjects(Router.currentRouteParams(), {settingId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("settingsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("settingsRemove", me._id, function(err, res) {
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
		Router.go("admin.settings_page.update", mergeObjects(Router.currentRouteParams(), {settingId: this._id}));
		return false;
	}
});

Template.AdminSettingsPageViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Settings.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Settings.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
