var pageSession = new ReactiveDict();

Template.PayoutsDetails.onCreated(function() {
	
});

Template.PayoutsDetails.onDestroyed(function() {
	
});

Template.PayoutsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PayoutsDetails.events({
	
});

Template.PayoutsDetails.helpers({
	
});

Template.PayoutsDetailsForm.onCreated(function() {
	
});

Template.PayoutsDetailsForm.onDestroyed(function() {
	
});

Template.PayoutsDetailsForm.onRendered(function() {
	

	pageSession.set("payoutsDetailsFormInfoMessage", "");
	pageSession.set("payoutsDetailsFormErrorMessage", "");

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

Template.PayoutsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("payoutsDetailsFormInfoMessage", "");
		pageSession.set("payoutsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var payoutsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(payoutsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("payoutsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("payoutsDetailsFormErrorMessage", message);
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

		Router.go("payouts", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("payouts", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.PayoutsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("payoutsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("payoutsDetailsFormErrorMessage");
	}
	
});
