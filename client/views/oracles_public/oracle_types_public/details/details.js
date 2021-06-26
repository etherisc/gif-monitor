var pageSession = new ReactiveDict();

Template.OraclesPublicOracleTypesPublicDetails.onCreated(function() {
	
});

Template.OraclesPublicOracleTypesPublicDetails.onDestroyed(function() {
	
});

Template.OraclesPublicOracleTypesPublicDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.OraclesPublicOracleTypesPublicDetails.events({
	
});

Template.OraclesPublicOracleTypesPublicDetails.helpers({
	
});

Template.OraclesPublicOracleTypesPublicDetailsForm.onCreated(function() {
	
});

Template.OraclesPublicOracleTypesPublicDetailsForm.onDestroyed(function() {
	
});

Template.OraclesPublicOracleTypesPublicDetailsForm.onRendered(function() {
	

	pageSession.set("oraclesPublicOracleTypesPublicDetailsFormInfoMessage", "");
	pageSession.set("oraclesPublicOracleTypesPublicDetailsFormErrorMessage", "");

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

Template.OraclesPublicOracleTypesPublicDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("oraclesPublicOracleTypesPublicDetailsFormInfoMessage", "");
		pageSession.set("oraclesPublicOracleTypesPublicDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var oraclesPublicOracleTypesPublicDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(oraclesPublicOracleTypesPublicDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("oraclesPublicOracleTypesPublicDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("oraclesPublicOracleTypesPublicDetailsFormErrorMessage", message);
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

		Router.go("oracles_public.oracle_types_public", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.OraclesPublicOracleTypesPublicDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("oraclesPublicOracleTypesPublicDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("oraclesPublicOracleTypesPublicDetailsFormErrorMessage");
	}
	
});
