Template.AdminLogsAnalytics.onCreated(function() {
	
});

Template.AdminLogsAnalytics.onDestroyed(function() {
	
});

Template.AdminLogsAnalytics.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminLogsAnalytics.events({
	
});

Template.AdminLogsAnalytics.helpers({
	
});


var AdminLogsAnalyticsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("LoglineListAnalyticsPagedSearchString") || "",
		searchFields: Session.get("LoglineListAnalyticsPagedSearchFields") || ["timestamp", "type", "source", "message", "args"],
		sortBy: Session.get("LoglineListAnalyticsPagedSortBy") || "",
		sortAscending: Session.get("LoglineListAnalyticsPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("loglineListAnalyticsPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminLogsAnalyticsView.onCreated(function() {
	
});

Template.AdminLogsAnalyticsView.onDestroyed(function() {
	
});

Template.AdminLogsAnalyticsView.onRendered(function() {
	Session.set("AdminLogsAnalyticsViewStyle", "table");
	
});

Template.AdminLogsAnalyticsView.events({
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
				Session.set("LoglineListAnalyticsPagedSearchString", searchString);
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
					Session.set("LoglineListAnalyticsPagedSearchString", searchString);
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
					Session.set("LoglineListAnalyticsPagedSearchString", "");
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
		AdminLogsAnalyticsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminLogsAnalyticsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminLogsAnalyticsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminLogsAnalyticsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("LoglineListAnalyticsPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("LoglineListAnalyticsPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("LoglineListAnalyticsPagedPageNo") || 0;
		if(currentPage < this.logline_list_analytics_paged_page_count - 1) {
			Session.set("LoglineListAnalyticsPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminLogsAnalyticsView.helpers({

	"insertButtonClass": function() {
		return Logs.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.logline_list_analytics_paged || this.logline_list_analytics_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.logline_list_analytics_paged && this.logline_list_analytics_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.logline_list_analytics_paged && this.logline_list_analytics_paged.count() == 0 && Session.get("LoglineListAnalyticsPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("LoglineListAnalyticsPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("LoglineListAnalyticsPagedPageNo") || 0) < this.logline_list_analytics_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("LoglineListAnalyticsPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminLogsAnalyticsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminLogsAnalyticsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminLogsAnalyticsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminLogsAnalyticsViewStyle") == "gallery";
	}

	
});


Template.AdminLogsAnalyticsViewTable.onCreated(function() {
	
});

Template.AdminLogsAnalyticsViewTable.onDestroyed(function() {
	
});

Template.AdminLogsAnalyticsViewTable.onRendered(function() {
	
});

Template.AdminLogsAnalyticsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("LoglineListAnalyticsPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("LoglineListAnalyticsPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("LoglineListAnalyticsPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("LoglineListAnalyticsPagedSortAscending", !sortAscending);
		} else {
			Session.set("LoglineListAnalyticsPagedSortAscending", true);
		}
	}
});

Template.AdminLogsAnalyticsViewTable.helpers({
});


Template.AdminLogsAnalyticsViewTableItems.onCreated(function() {
	
});

Template.AdminLogsAnalyticsViewTableItems.onDestroyed(function() {
	
});

Template.AdminLogsAnalyticsViewTableItems.onRendered(function() {
	
});

Template.AdminLogsAnalyticsViewTableItems.events({
	

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

Template.AdminLogsAnalyticsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Logs.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Logs.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.AdminLogsAnalyticsViewCustomActions.created = function() {

};

Template.AdminLogsAnalyticsViewCustomActions.destroyed = function() {

};

Template.AdminLogsAnalyticsViewCustomActions.rendered = function() {

};

Template.AdminLogsAnalyticsViewCustomActions.helpers({

});

Template.AdminLogsAnalyticsViewCustomActions.events({
	"click #btn-clear": function (e,t) {
		e.preventDefault();

		Meteor.call('blislogger.clear', {source: 'analytics'});
	}
});
