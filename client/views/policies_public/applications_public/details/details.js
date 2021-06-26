var pageSession = new ReactiveDict();

Template.PoliciesPublicApplicationsPublicDetails.onCreated(function() {
	
});

Template.PoliciesPublicApplicationsPublicDetails.onDestroyed(function() {
	
});

Template.PoliciesPublicApplicationsPublicDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PoliciesPublicApplicationsPublicDetails.events({
	
});

Template.PoliciesPublicApplicationsPublicDetails.helpers({
	
});

Template.PoliciesPublicApplicationsPublicDetailsForm.onCreated(function() {
	
});

Template.PoliciesPublicApplicationsPublicDetailsForm.onDestroyed(function() {
	
});

Template.PoliciesPublicApplicationsPublicDetailsForm.onRendered(function() {
	

	pageSession.set("policiesPublicApplicationsPublicDetailsFormInfoMessage", "");
	pageSession.set("policiesPublicApplicationsPublicDetailsFormErrorMessage", "");

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

Template.PoliciesPublicApplicationsPublicDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("policiesPublicApplicationsPublicDetailsFormInfoMessage", "");
		pageSession.set("policiesPublicApplicationsPublicDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var policiesPublicApplicationsPublicDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(policiesPublicApplicationsPublicDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("policiesPublicApplicationsPublicDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("policiesPublicApplicationsPublicDetailsFormErrorMessage", message);
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

		Router.go("policies_public.applications_public", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.PoliciesPublicApplicationsPublicDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("policiesPublicApplicationsPublicDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("policiesPublicApplicationsPublicDetailsFormErrorMessage");
	}
	
});
