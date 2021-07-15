Template.Contracts.onCreated(function() {
	
});

Template.Contracts.onDestroyed(function() {
	
});

Template.Contracts.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Contracts.events({
	
});

Template.Contracts.helpers({
	
});

Template.ContractsHeader.created = function() {

};

Template.ContractsHeader.destroyed = function() {

};

Template.ContractsHeader.rendered = function() {

};

Template.ContractsHeader.helpers({

});

Template.ContractsHeader.events({

});


var ContractsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ContractListPagedSearchString") || "",
		searchFields: Session.get("ContractListPagedSearchFields") || ["chain_data.name", "name", "address"],
		sortBy: Session.get("ContractListPagedSortBy") || "",
		sortAscending: Session.get("ContractListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("contractListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.ContractsView.onCreated(function() {
	
});

Template.ContractsView.onDestroyed(function() {
	
});

Template.ContractsView.onRendered(function() {
	Session.set("ContractsViewStyle", "table");
	
});

Template.ContractsView.events({
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
				Session.set("ContractListPagedSearchString", searchString);
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
					Session.set("ContractListPagedSearchString", searchString);
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
					Session.set("ContractListPagedSearchString", "");
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
		ContractsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ContractsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ContractsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ContractsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("ContractListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ContractListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ContractListPagedPageNo") || 0;
		if(currentPage < this.contract_list_paged_page_count - 1) {
			Session.set("ContractListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.ContractsView.helpers({

	"insertButtonClass": function() {
		return Contracts.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.contract_list_paged || this.contract_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.contract_list_paged && this.contract_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.contract_list_paged && this.contract_list_paged.count() == 0 && Session.get("ContractListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ContractListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ContractListPagedPageNo") || 0) < this.contract_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ContractListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("ContractsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("ContractsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("ContractsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("ContractsViewStyle") == "gallery";
	}

	
});


Template.ContractsViewTable.onCreated(function() {
	
});

Template.ContractsViewTable.onDestroyed(function() {
	
});

Template.ContractsViewTable.onRendered(function() {
	
});

Template.ContractsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("ContractListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ContractListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ContractListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ContractListPagedSortAscending", !sortAscending);
		} else {
			Session.set("ContractListPagedSortAscending", true);
		}
	}
});

Template.ContractsViewTable.helpers({
});


Template.ContractsViewTableItems.onCreated(function() {
	
});

Template.ContractsViewTableItems.onDestroyed(function() {
	
});

Template.ContractsViewTableItems.onRendered(function() {
	
});

Template.ContractsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("contracts.details", mergeObjects(Router.currentRouteParams(), {contractId: this._id}));
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

Template.ContractsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Contracts.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Contracts.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.ContractsViewCustomActions.created = function() {

};

Template.ContractsViewCustomActions.destroyed = function() {

};

Template.ContractsViewCustomActions.rendered = function() {

};

Template.ContractsViewCustomActions.helpers({

});

Template.ContractsViewCustomActions.events({
	"click #btn-reload": function (e,t) {
		e.preventDefault();

		Meteor.call('reload.contracts');
	}

});

