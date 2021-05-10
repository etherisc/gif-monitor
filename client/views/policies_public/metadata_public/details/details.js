var pageSession = new ReactiveDict();

Template.PoliciesPublicMetadataPublicDetails.onCreated(function() {
	
});

Template.PoliciesPublicMetadataPublicDetails.onDestroyed(function() {
	
});

Template.PoliciesPublicMetadataPublicDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PoliciesPublicMetadataPublicDetails.events({
	
});

Template.PoliciesPublicMetadataPublicDetails.helpers({
	
});

Template.PoliciesPublicMetadataPublicDetailsForm.onCreated(function() {
	
});

Template.PoliciesPublicMetadataPublicDetailsForm.onDestroyed(function() {
	
});

Template.PoliciesPublicMetadataPublicDetailsForm.onRendered(function() {
	

	pageSession.set("policiesPublicMetadataPublicDetailsFormInfoMessage", "");
	pageSession.set("policiesPublicMetadataPublicDetailsFormErrorMessage", "");

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

Template.PoliciesPublicMetadataPublicDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("policiesPublicMetadataPublicDetailsFormInfoMessage", "");
		pageSession.set("policiesPublicMetadataPublicDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var policiesPublicMetadataPublicDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(policiesPublicMetadataPublicDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("policiesPublicMetadataPublicDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("policiesPublicMetadataPublicDetailsFormErrorMessage", message);
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

		Router.go("metadata_public", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("metadata_public", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.PoliciesPublicMetadataPublicDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("policiesPublicMetadataPublicDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("policiesPublicMetadataPublicDetailsFormErrorMessage");
	}
	
});
