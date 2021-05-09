var pageSession = new ReactiveDict();

Template.ClaimsDetails.onCreated(function() {
	
});

Template.ClaimsDetails.onDestroyed(function() {
	
});

Template.ClaimsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ClaimsDetails.events({
	
});

Template.ClaimsDetails.helpers({
	
});

Template.ClaimsDetailsForm.onCreated(function() {
	
});

Template.ClaimsDetailsForm.onDestroyed(function() {
	
});

Template.ClaimsDetailsForm.onRendered(function() {
	

	pageSession.set("claimsDetailsFormInfoMessage", "");
	pageSession.set("claimsDetailsFormErrorMessage", "");

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

Template.ClaimsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("claimsDetailsFormInfoMessage", "");
		pageSession.set("claimsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var claimsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(claimsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("claimsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("claimsDetailsFormErrorMessage", message);
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

		Router.go("claims", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("claims", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ClaimsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("claimsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("claimsDetailsFormErrorMessage");
	}
	
});
