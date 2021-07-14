Template.Payouts.onCreated(function() {
	
});

Template.Payouts.onDestroyed(function() {
	
});

Template.Payouts.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Payouts.events({
	
});

Template.Payouts.helpers({
	
});


var PayoutsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("PayoutListPagedSearchString") || "",
		searchFields: Session.get("PayoutListPagedSearchFields") || ["bp_key", "metadata_mongo_id", "data", "state", "created_at", "updated_at", "claim_id", "claim_mongo_id"],
		sortBy: Session.get("PayoutListPagedSortBy") || "",
		sortAscending: Session.get("PayoutListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("payoutListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.PayoutsView.onCreated(function() {
	
});

Template.PayoutsView.onDestroyed(function() {
	
});

Template.PayoutsView.onRendered(function() {
	Session.set("PayoutsViewStyle", "table");
	
});

Template.PayoutsView.events({
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
				Session.set("PayoutListPagedSearchString", searchString);
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
					Session.set("PayoutListPagedSearchString", searchString);
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
					Session.set("PayoutListPagedSearchString", "");
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
		PayoutsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PayoutsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PayoutsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PayoutsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("PayoutListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("PayoutListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("PayoutListPagedPageNo") || 0;
		if(currentPage < this.payout_list_paged_page_count - 1) {
			Session.set("PayoutListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.PayoutsView.helpers({

	"insertButtonClass": function() {
		return Payouts.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.payout_list_paged || this.payout_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.payout_list_paged && this.payout_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.payout_list_paged && this.payout_list_paged.count() == 0 && Session.get("PayoutListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("PayoutListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("PayoutListPagedPageNo") || 0) < this.payout_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("PayoutListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("PayoutsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("PayoutsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("PayoutsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("PayoutsViewStyle") == "gallery";
	}

	
});


Template.PayoutsViewTable.onCreated(function() {
	
});

Template.PayoutsViewTable.onDestroyed(function() {
	
});

Template.PayoutsViewTable.onRendered(function() {
	
});

Template.PayoutsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("PayoutListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("PayoutListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("PayoutListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("PayoutListPagedSortAscending", !sortAscending);
		} else {
			Session.set("PayoutListPagedSortAscending", true);
		}
	}
});

Template.PayoutsViewTable.helpers({
});


Template.PayoutsViewTableItems.onCreated(function() {
	
});

Template.PayoutsViewTableItems.onDestroyed(function() {
	
});

Template.PayoutsViewTableItems.onRendered(function() {
	
});

Template.PayoutsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("payouts.details", mergeObjects(Router.currentRouteParams(), {payoutId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("payoutsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("payoutsRemove", me._id, function(err, res) {
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

Template.PayoutsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Payouts.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Payouts.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
