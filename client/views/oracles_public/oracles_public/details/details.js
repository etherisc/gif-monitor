var pageSession = new ReactiveDict();

Template.OraclesPublicOraclesPublicDetails.onCreated(function() {
	
});

Template.OraclesPublicOraclesPublicDetails.onDestroyed(function() {
	
});

Template.OraclesPublicOraclesPublicDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.OraclesPublicOraclesPublicDetails.events({
	
});

Template.OraclesPublicOraclesPublicDetails.helpers({
	
});

Template.OraclesPublicOraclesPublicDetailsForm.onCreated(function() {
	
});

Template.OraclesPublicOraclesPublicDetailsForm.onDestroyed(function() {
	
});

Template.OraclesPublicOraclesPublicDetailsForm.onRendered(function() {
	

	pageSession.set("oraclesPublicOraclesPublicDetailsFormInfoMessage", "");
	pageSession.set("oraclesPublicOraclesPublicDetailsFormErrorMessage", "");

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

Template.OraclesPublicOraclesPublicDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("oraclesPublicOraclesPublicDetailsFormInfoMessage", "");
		pageSession.set("oraclesPublicOraclesPublicDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var oraclesPublicOraclesPublicDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(oraclesPublicOraclesPublicDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("oraclesPublicOraclesPublicDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("oraclesPublicOraclesPublicDetailsFormErrorMessage", message);
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

		Router.go("oracles_public.oracles_public", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.OraclesPublicOraclesPublicDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("oraclesPublicOraclesPublicDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("oraclesPublicOraclesPublicDetailsFormErrorMessage");
	}
	
});
