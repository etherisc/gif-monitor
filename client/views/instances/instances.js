Template.Instances.onCreated(function() {
	
});

Template.Instances.onDestroyed(function() {
	
});

Template.Instances.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Instances.events({
	
});

Template.Instances.helpers({
	
});

Template.InstancesHeader.created = function() {

};

Template.InstancesHeader.destroyed = function() {

};

Template.InstancesHeader.rendered = function() {

};

Template.InstancesHeader.helpers({

});

Template.InstancesHeader.events({

});


var InstancesViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("InstanceListPagedSearchString") || "",
		searchFields: Session.get("InstanceListPagedSearchFields") || ["name", "chain", "chain_id", "registry_addr"],
		sortBy: Session.get("InstanceListPagedSortBy") || "",
		sortAscending: Session.get("InstanceListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("instanceListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.InstancesView.onCreated(function() {
	
});

Template.InstancesView.onDestroyed(function() {
	
});

Template.InstancesView.onRendered(function() {
	Session.set("InstancesViewStyle", "table");
	
});

Template.InstancesView.events({
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
				Session.set("InstanceListPagedSearchString", searchString);
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
					Session.set("InstanceListPagedSearchString", searchString);
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
					Session.set("InstanceListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("instances.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		InstancesViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		InstancesViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		InstancesViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		InstancesViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("InstanceListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("InstanceListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("InstanceListPagedPageNo") || 0;
		if(currentPage < this.instance_list_paged_page_count - 1) {
			Session.set("InstanceListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.InstancesView.helpers({

	"insertButtonClass": function() {
		return Instances.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.instance_list_paged || this.instance_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.instance_list_paged && this.instance_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.instance_list_paged && this.instance_list_paged.count() == 0 && Session.get("InstanceListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("InstanceListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("InstanceListPagedPageNo") || 0) < this.instance_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("InstanceListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("InstancesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("InstancesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("InstancesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("InstancesViewStyle") == "gallery";
	}

	
});


Template.InstancesViewTable.onCreated(function() {
	
});

Template.InstancesViewTable.onDestroyed(function() {
	
});

Template.InstancesViewTable.onRendered(function() {
	
});

Template.InstancesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("InstanceListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("InstanceListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("InstanceListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("InstanceListPagedSortAscending", !sortAscending);
		} else {
			Session.set("InstanceListPagedSortAscending", true);
		}
	}
});

Template.InstancesViewTable.helpers({
});


Template.InstancesViewTableItems.onCreated(function() {
	
});

Template.InstancesViewTableItems.onDestroyed(function() {
	
});

Template.InstancesViewTableItems.onRendered(function() {
	
});

Template.InstancesViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("instances.details", mergeObjects(Router.currentRouteParams(), {chainId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("instancesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("instancesRemove", me._id, function(err, res) {
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
		Router.go("instances.update", mergeObjects(Router.currentRouteParams(), {chainId: this._id}));
		return false;
	}
});

Template.InstancesViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Instances.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Instances.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
