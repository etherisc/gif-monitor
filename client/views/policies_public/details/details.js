var pageSession = new ReactiveDict();

Template.PoliciesPublicDetails.onCreated(function() {
	
});

Template.PoliciesPublicDetails.onDestroyed(function() {
	
});

Template.PoliciesPublicDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PoliciesPublicDetails.events({
	
});

Template.PoliciesPublicDetails.helpers({
	
});

Template.PoliciesPublicDetailsForm.onCreated(function() {
	
});

Template.PoliciesPublicDetailsForm.onDestroyed(function() {
	
});

Template.PoliciesPublicDetailsForm.onRendered(function() {
	

	pageSession.set("policiesPublicDetailsFormInfoMessage", "");
	pageSession.set("policiesPublicDetailsFormErrorMessage", "");

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

Template.PoliciesPublicDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("policiesPublicDetailsFormInfoMessage", "");
		pageSession.set("policiesPublicDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var policiesPublicDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(policiesPublicDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("policiesPublicDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("policiesPublicDetailsFormErrorMessage", message);
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

		Router.go("policies_public", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("policies_public", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.PoliciesPublicDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("policiesPublicDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("policiesPublicDetailsFormErrorMessage");
	}
	
});
