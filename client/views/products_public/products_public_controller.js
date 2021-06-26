this.ProductsPublicController = RouteController.extend({
	template: "ProductsPublic",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.productListPagedExtraParams = {
			searchText: Session.get("ProductListPagedSearchString") || "",
			searchFields: Session.get("ProductListPagedSearchFields") || ["name", "product_id", "owner", "address", "policy_flow", "policy_token", "release", "state"],
			sortBy: Session.get("ProductListPagedSortBy") || "",
			sortAscending: Session.get("ProductListPagedSortAscending"),
			pageNo: Session.get("ProductListPagedPageNo") || 0,
			pageSize: Session.get("ProductListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("product_list_paged", this.productListPagedExtraParams),
			Meteor.subscribe("product_list_paged_count", this.productListPagedExtraParams)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			product_list_paged: Products.find(databaseUtils.extendFilter({}, this.productListPagedExtraParams), databaseUtils.extendOptions({}, this.productListPagedExtraParams)),
			product_list_paged_count: Counts.get("product_list_paged_count")
		};
		

		
		data.product_list_paged_page_count = this.productListPagedExtraParams && this.productListPagedExtraParams.pageSize ? Math.ceil(data.product_list_paged_count / this.productListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.productListPagedExtraParams.pageNo >= data.product_list_paged_page_count) {
			Session.set("ProductListPagedPageNo", data.product_list_paged_page_count > 0 ? data.product_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});