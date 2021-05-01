Template.AdminLogsServer.onCreated(function() {
	
});

Template.AdminLogsServer.onDestroyed(function() {
	
});

Template.AdminLogsServer.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminLogsServer.events({
	
});

Template.AdminLogsServer.helpers({
	
});


var AdminLogsServerViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("LoglineListServerPagedSearchString") || "",
		searchFields: Session.get("LoglineListServerPagedSearchFields") || ["timestamp", "type", "source", "message", "args"],
		sortBy: Session.get("LoglineListServerPagedSortBy") || "",
		sortAscending: Session.get("LoglineListServerPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("loglineListServerPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminLogsServerView.onCreated(function() {
	
});

Template.AdminLogsServerView.onDestroyed(function() {
	
});

Template.AdminLogsServerView.onRendered(function() {
	Session.set("AdminLogsServerViewStyle", "table");
	
});

Template.AdminLogsServerView.events({
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
				Session.set("LoglineListServerPagedSearchString", searchString);
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
					Session.set("LoglineListServerPagedSearchString", searchString);
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
					Session.set("LoglineListServerPagedSearchString", "");
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
		AdminLogsServerViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminLogsServerViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminLogsServerViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminLogsServerViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("LoglineListServerPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("LoglineListServerPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("LoglineListServerPagedPageNo") || 0;
		if(currentPage < this.logline_list_server_paged_page_count - 1) {
			Session.set("LoglineListServerPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminLogsServerView.helpers({

	"insertButtonClass": function() {
		return Logs.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.logline_list_server_paged || this.logline_list_server_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.logline_list_server_paged && this.logline_list_server_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.logline_list_server_paged && this.logline_list_server_paged.count() == 0 && Session.get("LoglineListServerPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("LoglineListServerPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("LoglineListServerPagedPageNo") || 0) < this.logline_list_server_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("LoglineListServerPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminLogsServerViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminLogsServerViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminLogsServerViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminLogsServerViewStyle") == "gallery";
	}

	
});


Template.AdminLogsServerViewTable.onCreated(function() {
	
});

Template.AdminLogsServerViewTable.onDestroyed(function() {
	
});

Template.AdminLogsServerViewTable.onRendered(function() {
	
});

Template.AdminLogsServerViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("LoglineListServerPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("LoglineListServerPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("LoglineListServerPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("LoglineListServerPagedSortAscending", !sortAscending);
		} else {
			Session.set("LoglineListServerPagedSortAscending", true);
		}
	}
});

Template.AdminLogsServerViewTable.helpers({
});


Template.AdminLogsServerViewTableItems.onCreated(function() {
	
});

Template.AdminLogsServerViewTableItems.onDestroyed(function() {
	
});

Template.AdminLogsServerViewTableItems.onRendered(function() {
	
});

Template.AdminLogsServerViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		$(document).on('click', '.modal-backdrop', function (event) {
    bootbox.hideAll();
});

bootbox.dialog({
	title: 'LogLine Details',
	message: "<div id='dialogNode'></div>",
	size:'large',
	buttons: {
		close: {
			label: "Close",
			className: "btn btn-info"
		}
	}
});

Blaze.renderWithData(Template.AdminDetailsModal, {logline: t.data}, $("#dialogNode")[0]);

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

Template.AdminLogsServerViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Logs.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Logs.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.AdminLogsServerViewCustomActions.created = function() {

};

Template.AdminLogsServerViewCustomActions.destroyed = function() {

};

Template.AdminLogsServerViewCustomActions.rendered = function() {

};

Template.AdminLogsServerViewCustomActions.helpers({

});

Template.AdminLogsServerViewCustomActions.events({
	"click #btn-clear": function (e,t) {
		e.preventDefault();

		Meteor.call('logger.clear', {source: 'server'});
	}

});
