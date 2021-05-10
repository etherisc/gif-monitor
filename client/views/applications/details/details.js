var pageSession = new ReactiveDict();

Template.ApplicationsDetails.onCreated(function() {
	
});

Template.ApplicationsDetails.onDestroyed(function() {
	
});

Template.ApplicationsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ApplicationsDetails.events({
	
});

Template.ApplicationsDetails.helpers({
	
});

Template.ApplicationsDetailsForm.onCreated(function() {
	
});

Template.ApplicationsDetailsForm.onDestroyed(function() {
	
});

Template.ApplicationsDetailsForm.onRendered(function() {
	

	pageSession.set("applicationsDetailsFormInfoMessage", "");
	pageSession.set("applicationsDetailsFormErrorMessage", "");

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

Template.ApplicationsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("applicationsDetailsFormInfoMessage", "");
		pageSession.set("applicationsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var applicationsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(applicationsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("applicationsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("applicationsDetailsFormErrorMessage", message);
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

		Router.go("applications", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("applications", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ApplicationsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("applicationsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("applicationsDetailsFormErrorMessage");
	}
	
});
