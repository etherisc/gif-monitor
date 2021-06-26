var pageSession = new ReactiveDict();

Template.ProductsPublicDetails.onCreated(function() {
	
});

Template.ProductsPublicDetails.onDestroyed(function() {
	
});

Template.ProductsPublicDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ProductsPublicDetails.events({
	
});

Template.ProductsPublicDetails.helpers({
	
});

Template.ProductsPublicDetailsForm.onCreated(function() {
	
});

Template.ProductsPublicDetailsForm.onDestroyed(function() {
	
});

Template.ProductsPublicDetailsForm.onRendered(function() {
	

	pageSession.set("productsPublicDetailsFormInfoMessage", "");
	pageSession.set("productsPublicDetailsFormErrorMessage", "");

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

Template.ProductsPublicDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("productsPublicDetailsFormInfoMessage", "");
		pageSession.set("productsPublicDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var productsPublicDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(productsPublicDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("productsPublicDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("productsPublicDetailsFormErrorMessage", message);
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

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("products_public", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ProductsPublicDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("productsPublicDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("productsPublicDetailsFormErrorMessage");
	}
	
});
