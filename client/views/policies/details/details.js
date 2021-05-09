var pageSession = new ReactiveDict();

Template.PoliciesDetails.onCreated(function() {
	
});

Template.PoliciesDetails.onDestroyed(function() {
	
});

Template.PoliciesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PoliciesDetails.events({
	
});

Template.PoliciesDetails.helpers({
	
});

Template.PoliciesDetailsForm.onCreated(function() {
	
});

Template.PoliciesDetailsForm.onDestroyed(function() {
	
});

Template.PoliciesDetailsForm.onRendered(function() {
	

	pageSession.set("policiesDetailsFormInfoMessage", "");
	pageSession.set("policiesDetailsFormErrorMessage", "");

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

Template.PoliciesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("policiesDetailsFormInfoMessage", "");
		pageSession.set("policiesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var policiesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(policiesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("policiesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("policiesDetailsFormErrorMessage", message);
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

		Router.go("policies", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("policies", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.PoliciesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("policiesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("policiesDetailsFormErrorMessage");
	}
	
});
