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
		this.productList1PagedExtraParams = {
			searchText: Session.get("ProductList1PagedSearchString") || "",
			searchFields: Session.get("ProductList1PagedSearchFields") || ["name", "product_id", "owner", "address", "policy_flow", "policy_token", "release", "approved", "paused"],
			sortBy: Session.get("ProductList1PagedSortBy") || "",
			sortAscending: Session.get("ProductList1PagedSortAscending"),
			pageNo: Session.get("ProductList1PagedPageNo") || 0,
			pageSize: Session.get("ProductList1PagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("product_list1_paged", this.productList1PagedExtraParams),
			Meteor.subscribe("product_list1_paged_count", this.productList1PagedExtraParams)
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
			product_list1_paged: Products.find(databaseUtils.extendFilter({}, this.productList1PagedExtraParams), databaseUtils.extendOptions({}, this.productList1PagedExtraParams)),
			product_list1_paged_count: Counts.get("product_list1_paged_count")
		};
		

		
		data.product_list1_paged_page_count = this.productList1PagedExtraParams && this.productList1PagedExtraParams.pageSize ? Math.ceil(data.product_list1_paged_count / this.productList1PagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.productList1PagedExtraParams.pageNo >= data.product_list1_paged_page_count) {
			Session.set("ProductList1PagedPageNo", data.product_list1_paged_page_count > 0 ? data.product_list1_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});