var pageSession = new ReactiveDict();

Template.EventsDetails.onCreated(function() {
	
});

Template.EventsDetails.onDestroyed(function() {
	
});

Template.EventsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.EventsDetails.events({
	
});

Template.EventsDetails.helpers({
	
});

Template.EventsDetailsForm.onCreated(function() {
	
});

Template.EventsDetailsForm.onDestroyed(function() {
	
});

Template.EventsDetailsForm.onRendered(function() {
	

	pageSession.set("eventsDetailsFormInfoMessage", "");
	pageSession.set("eventsDetailsFormErrorMessage", "");

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

Template.EventsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("eventsDetailsFormInfoMessage", "");
		pageSession.set("eventsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var eventsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(eventsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("eventsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("eventsDetailsFormErrorMessage", message);
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

		Router.go("events", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("events", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.EventsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("eventsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("eventsDetailsFormErrorMessage");
	}
	
});
