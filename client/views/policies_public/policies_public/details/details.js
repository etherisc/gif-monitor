var pageSession = new ReactiveDict();

Template.PoliciesPublicPoliciesPublicDetails.onCreated(function() {
	
});

Template.PoliciesPublicPoliciesPublicDetails.onDestroyed(function() {
	
});

Template.PoliciesPublicPoliciesPublicDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PoliciesPublicPoliciesPublicDetails.events({
	
});

Template.PoliciesPublicPoliciesPublicDetails.helpers({
	
});

Template.PoliciesPublicPoliciesPublicDetailsForm.onCreated(function() {
	
});

Template.PoliciesPublicPoliciesPublicDetailsForm.onDestroyed(function() {
	
});

Template.PoliciesPublicPoliciesPublicDetailsForm.onRendered(function() {
	

	pageSession.set("policiesPublicPoliciesPublicDetailsFormInfoMessage", "");
	pageSession.set("policiesPublicPoliciesPublicDetailsFormErrorMessage", "");

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

Template.PoliciesPublicPoliciesPublicDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("policiesPublicPoliciesPublicDetailsFormInfoMessage", "");
		pageSession.set("policiesPublicPoliciesPublicDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var policiesPublicPoliciesPublicDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(policiesPublicPoliciesPublicDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("policiesPublicPoliciesPublicDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("policiesPublicPoliciesPublicDetailsFormErrorMessage", message);
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

		Router.go("policies_public.policies_public", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("policies_public.policies_public", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.PoliciesPublicPoliciesPublicDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("policiesPublicPoliciesPublicDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("policiesPublicPoliciesPublicDetailsFormErrorMessage");
	}
	
});
