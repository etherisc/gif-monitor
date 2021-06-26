var pageSession = new ReactiveDict();

Template.CorePublicEventsPublicDetails.onCreated(function() {
	
});

Template.CorePublicEventsPublicDetails.onDestroyed(function() {
	
});

Template.CorePublicEventsPublicDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CorePublicEventsPublicDetails.events({
	
});

Template.CorePublicEventsPublicDetails.helpers({
	
});

Template.CorePublicEventsPublicDetailsForm.onCreated(function() {
	
});

Template.CorePublicEventsPublicDetailsForm.onDestroyed(function() {
	
});

Template.CorePublicEventsPublicDetailsForm.onRendered(function() {
	// console.log(this);

$('.control-field-values').jsonViewer(this.data.event.values);

	pageSession.set("corePublicEventsPublicDetailsFormInfoMessage", "");
	pageSession.set("corePublicEventsPublicDetailsFormErrorMessage", "");

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

Template.CorePublicEventsPublicDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("corePublicEventsPublicDetailsFormInfoMessage", "");
		pageSession.set("corePublicEventsPublicDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var corePublicEventsPublicDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(corePublicEventsPublicDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("corePublicEventsPublicDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("corePublicEventsPublicDetailsFormErrorMessage", message);
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

		Router.go("core_public.events_public", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.CorePublicEventsPublicDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("corePublicEventsPublicDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("corePublicEventsPublicDetailsFormErrorMessage");
	}
	
});
