Template.CoreCoreContracts.onCreated(function() {
	
});

Template.CoreCoreContracts.onDestroyed(function() {
	
});

Template.CoreCoreContracts.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CoreCoreContracts.events({
	
});

Template.CoreCoreContracts.helpers({
	
});


var CoreCoreContractsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ContractListPublicPagedSearchString") || "",
		searchFields: Session.get("ContractListPublicPagedSearchFields") || ["address", "name", "abi", "deployment_txhash", "deployed_at_block"],
		sortBy: Session.get("ContractListPublicPagedSortBy") || "",
		sortAscending: Session.get("ContractListPublicPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("contractListPublicPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.CoreCoreContractsView.onCreated(function() {
	
});

Template.CoreCoreContractsView.onDestroyed(function() {
	
});

Template.CoreCoreContractsView.onRendered(function() {
	Session.set("CoreCoreContractsViewStyle", "table");
	
});

Template.CoreCoreContractsView.events({
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
				Session.set("ContractListPublicPagedSearchString", searchString);
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
					Session.set("ContractListPublicPagedSearchString", searchString);
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
					Session.set("ContractListPublicPagedSearchString", "");
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
		CoreCoreContractsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CoreCoreContractsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CoreCoreContractsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CoreCoreContractsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("ContractListPublicPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ContractListPublicPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ContractListPublicPagedPageNo") || 0;
		if(currentPage < this.contract_list_public_paged_page_count - 1) {
			Session.set("ContractListPublicPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.CoreCoreContractsView.helpers({

	"insertButtonClass": function() {
		return Contracts.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.contract_list_public_paged || this.contract_list_public_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.contract_list_public_paged && this.contract_list_public_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.contract_list_public_paged && this.contract_list_public_paged.count() == 0 && Session.get("ContractListPublicPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ContractListPublicPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ContractListPublicPagedPageNo") || 0) < this.contract_list_public_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ContractListPublicPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("CoreCoreContractsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("CoreCoreContractsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("CoreCoreContractsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("CoreCoreContractsViewStyle") == "gallery";
	}

	
});


Template.CoreCoreContractsViewTable.onCreated(function() {
	
});

Template.CoreCoreContractsViewTable.onDestroyed(function() {
	
});

Template.CoreCoreContractsViewTable.onRendered(function() {
	
});

Template.CoreCoreContractsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("ContractListPublicPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ContractListPublicPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ContractListPublicPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ContractListPublicPagedSortAscending", !sortAscending);
		} else {
			Session.set("ContractListPublicPagedSortAscending", true);
		}
	}
});

Template.CoreCoreContractsViewTable.helpers({
});


Template.CoreCoreContractsViewTableItems.onCreated(function() {
	
});

Template.CoreCoreContractsViewTableItems.onDestroyed(function() {
	
});

Template.CoreCoreContractsViewTableItems.onRendered(function() {
	
});

Template.CoreCoreContractsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("core.core_contracts.details", mergeObjects(Router.currentRouteParams(), {contractId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("contractsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("contractsRemove", me._id, function(err, res) {
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

Template.CoreCoreContractsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Contracts.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Contracts.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
