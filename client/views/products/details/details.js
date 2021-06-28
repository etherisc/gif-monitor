var pageSession = new ReactiveDict();

Template.ProductsDetails.onCreated(function() {
	
});

Template.ProductsDetails.onDestroyed(function() {
	
});

Template.ProductsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ProductsDetails.events({
	
});

Template.ProductsDetails.helpers({
	
});

Template.ProductsDetailsForm.onCreated(function() {
	
});

Template.ProductsDetailsForm.onDestroyed(function() {
	
});

Template.ProductsDetailsForm.onRendered(function() {
	this.autorun(() => {
    this.subscribe('contract_list');
  });

	pageSession.set("productsDetailsFormInfoMessage", "");
	pageSession.set("productsDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.ProductsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("productsDetailsFormInfoMessage", "");
		pageSession.set("productsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var productsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(productsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("productsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("productsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("products", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("products", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ProductsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("productsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("productsDetailsFormErrorMessage");
	}, 
		
});

Template.ProductsDetailsFormCustomActions.created = function() {

};

Template.ProductsDetailsFormCustomActions.destroyed = function() {

};

Template.ProductsDetailsFormCustomActions.rendered = function() {

};

Template.ProductsDetailsFormCustomActions.helpers({
	"isPaused": function(){
		return this.product.paused;
	},

	"isApproved": function(){
		return this.product.approved;
	}
});

Template.ProductsDetailsFormCustomActions.events({
	"click #btn-pause": async function (e,t) {
		e.preventDefault();
		await setProductState(
			t.data.product.product_id,
			'Paused'
		);
		return false;
	},
	"click #btn-approve": async function (e,t) {
		e.preventDefault();
		await setProductState(
			t.data.product.product_id,
			'Approved'
		);
		return false;
	},
	"click #btn-propose": async function (e,t) {
		e.preventDefault();
		await setProductState(
			t.data.product.product_id,
			'Proposed'
		);
		return false;
	},
	"click #btn-reload": function (e,t) {
		e.preventDefault();

		reloadProduct(
			t.data.product.product_id
		);
		return false;
	}
});
