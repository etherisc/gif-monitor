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
		searchText: Session.get("ChainList1PagedSearchString") || "",
		searchFields: Session.get("ChainList1PagedSearchFields") || ["chain_id", "name", "native_coin", "explorer_tx_url", "explorer_address_url"],
		sortBy: Session.get("ChainList1PagedSortBy") || "",
		sortAscending: Session.get("ChainList1PagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("chainList1PagedExport", extraParams, exportFields, fileType, function(e, data) {
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
				Session.set("ChainList1PagedSearchString", searchString);
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
					Session.set("ChainList1PagedSearchString", searchString);
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
					Session.set("ChainList1PagedSearchString", "");
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
		var currentPage = Session.get("ChainList1PagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ChainList1PagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ChainList1PagedPageNo") || 0;
		if(currentPage < this.chain_list1paged_page_count - 1) {
			Session.set("ChainList1PagedPageNo", currentPage + 1);
		}
	}

	
});

Template.ChainsView.helpers({

	"insertButtonClass": function() {
		return Chains.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.chain_list1_paged || this.chain_list1_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.chain_list1_paged && this.chain_list1_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.chain_list1_paged && this.chain_list1_paged.count() == 0 && Session.get("ChainList1PagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ChainList1PagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ChainList1PagedPageNo") || 0) < this.chain_list1paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ChainList1PagedSearchString");
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
		var oldSortBy = Session.get("ChainList1PagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ChainList1PagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ChainList1PagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ChainList1PagedSortAscending", !sortAscending);
		} else {
			Session.set("ChainList1PagedSortAscending", true);
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

		Meteor.call("chainsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("chainsRemove", me._id, function(err, res) {
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
		return Chains.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Chains.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
