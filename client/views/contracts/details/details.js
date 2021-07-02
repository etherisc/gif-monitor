var pageSession = new ReactiveDict();

Template.ContractsDetails.onCreated(function() {
	
});

Template.ContractsDetails.onDestroyed(function() {
	
});

Template.ContractsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ContractsDetails.events({
	
});

Template.ContractsDetails.helpers({
	
});

Template.ContractsDetailsForm.onCreated(function() {
	
});

Template.ContractsDetailsForm.onDestroyed(function() {
	
});

Template.ContractsDetailsForm.onRendered(function() {
	// console.log(this);

// $('.control-field-abi').jsonViewer(this.data.contract.abi, {collapsed: true});

	pageSession.set("contractsDetailsFormInfoMessage", "");
	pageSession.set("contractsDetailsFormErrorMessage", "");

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

Template.ContractsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contractsDetailsFormInfoMessage", "");
		pageSession.set("contractsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var contractsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(contractsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contractsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contractsDetailsFormErrorMessage", message);
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

		Router.go("contracts", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("contracts", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ContractsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contractsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contractsDetailsFormErrorMessage");
	}
	
});
