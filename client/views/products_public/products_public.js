Template.ProductsPublic.onCreated(function() {
	
});

Template.ProductsPublic.onDestroyed(function() {
	
});

Template.ProductsPublic.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ProductsPublic.events({
	
});

Template.ProductsPublic.helpers({
	
});


var ProductsPublicViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ProductListPagedSearchString") || "",
		searchFields: Session.get("ProductListPagedSearchFields") || ["name", "product_id", "owner", "address", "policy_flow", "policy_token", "release", "state"],
		sortBy: Session.get("ProductListPagedSortBy") || "",
		sortAscending: Session.get("ProductListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("productListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.ProductsPublicView.onCreated(function() {
	
});

Template.ProductsPublicView.onDestroyed(function() {
	
});

Template.ProductsPublicView.onRendered(function() {
	Session.set("ProductsPublicViewStyle", "table");
	
});

Template.ProductsPublicView.events({
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
				Session.set("ProductListPagedSearchString", searchString);
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
					Session.set("ProductListPagedSearchString", searchString);
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
					Session.set("ProductListPagedSearchString", "");
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
		ProductsPublicViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ProductsPublicViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ProductsPublicViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ProductsPublicViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("ProductListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ProductListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ProductListPagedPageNo") || 0;
		if(currentPage < this.product_list_paged_page_count - 1) {
			Session.set("ProductListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.ProductsPublicView.helpers({

	"insertButtonClass": function() {
		return Products.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.product_list_paged || this.product_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.product_list_paged && this.product_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.product_list_paged && this.product_list_paged.count() == 0 && Session.get("ProductListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ProductListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ProductListPagedPageNo") || 0) < this.product_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ProductListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("ProductsPublicViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("ProductsPublicViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("ProductsPublicViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("ProductsPublicViewStyle") == "gallery";
	}

	
});


Template.ProductsPublicViewTable.onCreated(function() {
	
});

Template.ProductsPublicViewTable.onDestroyed(function() {
	
});

Template.ProductsPublicViewTable.onRendered(function() {
	
});

Template.ProductsPublicViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("ProductListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ProductListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ProductListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ProductListPagedSortAscending", !sortAscending);
		} else {
			Session.set("ProductListPagedSortAscending", true);
		}
	}
});

Template.ProductsPublicViewTable.helpers({
});


Template.ProductsPublicViewTableItems.onCreated(function() {
	
});

Template.ProductsPublicViewTableItems.onDestroyed(function() {
	
});

Template.ProductsPublicViewTableItems.onRendered(function() {
	
});

Template.ProductsPublicViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("products_public.details", mergeObjects(Router.currentRouteParams(), {productId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("productsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("productsRemove", me._id, function(err, res) {
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

Template.ProductsPublicViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Products.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Products.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

