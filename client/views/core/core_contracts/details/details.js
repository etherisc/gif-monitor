var pageSession = new ReactiveDict();

Template.CoreCoreContractsDetails.onCreated(function() {
	
});

Template.CoreCoreContractsDetails.onDestroyed(function() {
	
});

Template.CoreCoreContractsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CoreCoreContractsDetails.events({
	
});

Template.CoreCoreContractsDetails.helpers({
	
});

Template.CoreCoreContractsDetailsForm.onCreated(function() {
	
});

Template.CoreCoreContractsDetailsForm.onDestroyed(function() {
	
});

Template.CoreCoreContractsDetailsForm.onRendered(function() {
	

	pageSession.set("coreCoreContractsDetailsFormInfoMessage", "");
	pageSession.set("coreCoreContractsDetailsFormErrorMessage", "");

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

Template.CoreCoreContractsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("coreCoreContractsDetailsFormInfoMessage", "");
		pageSession.set("coreCoreContractsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var coreCoreContractsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(coreCoreContractsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("coreCoreContractsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("coreCoreContractsDetailsFormErrorMessage", message);
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

		Router.go("core.core_contracts", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("core.core_contracts", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.CoreCoreContractsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("coreCoreContractsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("coreCoreContractsDetailsFormErrorMessage");
	}
	
});
