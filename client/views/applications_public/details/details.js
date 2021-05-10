var pageSession = new ReactiveDict();

Template.ApplicationsPublicDetails.onCreated(function() {
	
});

Template.ApplicationsPublicDetails.onDestroyed(function() {
	
});

Template.ApplicationsPublicDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ApplicationsPublicDetails.events({
	
});

Template.ApplicationsPublicDetails.helpers({
	
});

Template.ApplicationsPublicDetailsForm.onCreated(function() {
	
});

Template.ApplicationsPublicDetailsForm.onDestroyed(function() {
	
});

Template.ApplicationsPublicDetailsForm.onRendered(function() {
	

	pageSession.set("applicationsPublicDetailsFormInfoMessage", "");
	pageSession.set("applicationsPublicDetailsFormErrorMessage", "");

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

Template.ApplicationsPublicDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("applicationsPublicDetailsFormInfoMessage", "");
		pageSession.set("applicationsPublicDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var applicationsPublicDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(applicationsPublicDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("applicationsPublicDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("applicationsPublicDetailsFormErrorMessage", message);
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

		Router.go("applications_public", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("applications_public", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ApplicationsPublicDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("applicationsPublicDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("applicationsPublicDetailsFormErrorMessage");
	}
	
});
