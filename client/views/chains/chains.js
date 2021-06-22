Template.Chains.onCreated(function() {
	
});

Template.Chains.onDestroyed(function() {
	
});

Template.Chains.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Chains.events({
	
});

Template.Chains.helpers({
	
});

Template.ChainsHeader.created = function() {

};

Template.ChainsHeader.destroyed = function() {

};

Template.ChainsHeader.rendered = function() {

};

Template.ChainsHeader.helpers({

});

Template.ChainsHeader.events({

});


var ChainsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("InstanceListPagedSearchString") || "",
		searchFields: Session.get("InstanceListPagedSearchFields") || ["name", "chain_id", "registry_addr"],
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

Template.ChainsView.onCreated(function() {
	
});

Template.ChainsView.onDestroyed(function() {
	
});

Template.ChainsView.onRendered(function() {
	Session.set("ChainsViewStyle", "table");
	
});

Template.ChainsView.events({
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
		Router.go("chains.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ChainsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ChainsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ChainsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ChainsViewExport.call(this, "json");
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

Template.ChainsView.helpers({

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
		return Session.get("ChainsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("ChainsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("ChainsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("ChainsViewStyle") == "gallery";
	}

	
});


Template.ChainsViewTable.onCreated(function() {
	
});

Template.ChainsViewTable.onDestroyed(function() {
	
});

Template.ChainsViewTable.onRendered(function() {
	
});

Template.ChainsViewTable.events({
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

Template.ChainsViewTable.helpers({
});


Template.ChainsViewTableItems.onCreated(function() {
	
});

Template.ChainsViewTableItems.onDestroyed(function() {
	
});

Template.ChainsViewTableItems.onRendered(function() {
	
});

Template.ChainsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("chains.details", mergeObjects(Router.currentRouteParams(), {chainId: this._id}));
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
		Router.go("chains.update", mergeObjects(Router.currentRouteParams(), {chainId: this._id}));
		return false;
	}
});

Template.ChainsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Instances.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Instances.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
