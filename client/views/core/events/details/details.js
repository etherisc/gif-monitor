var pageSession = new ReactiveDict();

Template.CoreEventsDetails.onCreated(function() {
	
});

Template.CoreEventsDetails.onDestroyed(function() {
	
});

Template.CoreEventsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CoreEventsDetails.events({
	
});

Template.CoreEventsDetails.helpers({
	
});

Template.CoreEventsDetailsForm.onCreated(function() {
	
});

Template.CoreEventsDetailsForm.onDestroyed(function() {
	
});

Template.CoreEventsDetailsForm.onRendered(function() {
	

	pageSession.set("coreEventsDetailsFormInfoMessage", "");
	pageSession.set("coreEventsDetailsFormErrorMessage", "");

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

Template.CoreEventsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("coreEventsDetailsFormInfoMessage", "");
		pageSession.set("coreEventsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var coreEventsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(coreEventsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("coreEventsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("coreEventsDetailsFormErrorMessage", message);
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

		Router.go("core.events", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("core.events", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.CoreEventsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("coreEventsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("coreEventsDetailsFormErrorMessage");
	}
	
});
