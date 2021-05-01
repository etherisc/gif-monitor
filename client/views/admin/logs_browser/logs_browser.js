Template.AdminLogsBrowser.onCreated(function() {
	
});

Template.AdminLogsBrowser.onDestroyed(function() {
	
});

Template.AdminLogsBrowser.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminLogsBrowser.events({
	
});

Template.AdminLogsBrowser.helpers({
	
});


var AdminLogsBrowserViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("LoglineListBrowserPagedSearchString") || "",
		searchFields: Session.get("LoglineListBrowserPagedSearchFields") || ["timestamp", "type", "source", "message", "args"],
		sortBy: Session.get("LoglineListBrowserPagedSortBy") || "",
		sortAscending: Session.get("LoglineListBrowserPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("loglineListBrowserPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminLogsBrowserView.onCreated(function() {
	
});

Template.AdminLogsBrowserView.onDestroyed(function() {
	
});

Template.AdminLogsBrowserView.onRendered(function() {
	Session.set("AdminLogsBrowserViewStyle", "table");
	
});

Template.AdminLogsBrowserView.events({
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
				Session.set("LoglineListBrowserPagedSearchString", searchString);
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
					Session.set("LoglineListBrowserPagedSearchString", searchString);
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
					Session.set("LoglineListBrowserPagedSearchString", "");
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
		AdminLogsBrowserViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminLogsBrowserViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminLogsBrowserViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminLogsBrowserViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("LoglineListBrowserPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("LoglineListBrowserPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("LoglineListBrowserPagedPageNo") || 0;
		if(currentPage < this.logline_list_browser_paged_page_count - 1) {
			Session.set("LoglineListBrowserPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminLogsBrowserView.helpers({

	"insertButtonClass": function() {
		return Logs.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.logline_list_browser_paged || this.logline_list_browser_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.logline_list_browser_paged && this.logline_list_browser_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.logline_list_browser_paged && this.logline_list_browser_paged.count() == 0 && Session.get("LoglineListBrowserPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("LoglineListBrowserPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("LoglineListBrowserPagedPageNo") || 0) < this.logline_list_browser_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("LoglineListBrowserPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminLogsBrowserViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminLogsBrowserViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminLogsBrowserViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminLogsBrowserViewStyle") == "gallery";
	}

	
});


Template.AdminLogsBrowserViewTable.onCreated(function() {
	
});

Template.AdminLogsBrowserViewTable.onDestroyed(function() {
	
});

Template.AdminLogsBrowserViewTable.onRendered(function() {
	
});

Template.AdminLogsBrowserViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("LoglineListBrowserPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("LoglineListBrowserPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("LoglineListBrowserPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("LoglineListBrowserPagedSortAscending", !sortAscending);
		} else {
			Session.set("LoglineListBrowserPagedSortAscending", true);
		}
	}
});

Template.AdminLogsBrowserViewTable.helpers({
});


Template.AdminLogsBrowserViewTableItems.onCreated(function() {
	
});

Template.AdminLogsBrowserViewTableItems.onDestroyed(function() {
	
});

Template.AdminLogsBrowserViewTableItems.onRendered(function() {
	
});

Template.AdminLogsBrowserViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		$(document).on('click', '.modal-backdrop', function (event) {
    bootbox.hideAll();
});

bootbox.dialog({
	title: 'LogLine Details',
	size:'large',
	message: "<div id='dialogNode'></div>",
	buttons: {
		close: {
			label: "Close",
			className: "btn btn-info"
		}
	}
});

Blaze.renderWithData(Template.AdminDetailsModalForm, {logline: t.data}, $("#dialogNode")[0]);

		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("logsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("logsRemove", me._id, function(err, res) {
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

Template.AdminLogsBrowserViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Logs.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Logs.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.AdminLogsBrowserViewCustomActions.created = function() {

};

Template.AdminLogsBrowserViewCustomActions.destroyed = function() {

};

Template.AdminLogsBrowserViewCustomActions.rendered = function() {

};

Template.AdminLogsBrowserViewCustomActions.helpers({

});

Template.AdminLogsBrowserViewCustomActions.events({
	"click #btn-clear": function (e,t) {
		e.preventDefault();

		Meteor.call('logger.clear', {source: 'browser'});
	}

});
