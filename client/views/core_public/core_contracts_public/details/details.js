var pageSession = new ReactiveDict();

Template.CorePublicCoreContractsPublicDetails.onCreated(function() {
	
});

Template.CorePublicCoreContractsPublicDetails.onDestroyed(function() {
	
});

Template.CorePublicCoreContractsPublicDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CorePublicCoreContractsPublicDetails.events({
	
});

Template.CorePublicCoreContractsPublicDetails.helpers({
	
});

Template.CorePublicCoreContractsPublicDetailsForm.onCreated(function() {
	
});

Template.CorePublicCoreContractsPublicDetailsForm.onDestroyed(function() {
	
});

Template.CorePublicCoreContractsPublicDetailsForm.onRendered(function() {
	// console.log(this);

$('.control-field-abi').jsonViewer(this.data.contract.abi, {collapsed: true});

	pageSession.set("corePublicCoreContractsPublicDetailsFormInfoMessage", "");
	pageSession.set("corePublicCoreContractsPublicDetailsFormErrorMessage", "");

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

Template.CorePublicCoreContractsPublicDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("corePublicCoreContractsPublicDetailsFormInfoMessage", "");
		pageSession.set("corePublicCoreContractsPublicDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var corePublicCoreContractsPublicDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(corePublicCoreContractsPublicDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("corePublicCoreContractsPublicDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("corePublicCoreContractsPublicDetailsFormErrorMessage", message);
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

		Router.go("core_public.core_contracts_public", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("core_public.core_contracts_public", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.CorePublicCoreContractsPublicDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("corePublicCoreContractsPublicDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("corePublicCoreContractsPublicDetailsFormErrorMessage");
	}
	
});

