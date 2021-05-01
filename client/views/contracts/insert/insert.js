var pageSession = new ReactiveDict();

Template.ContractsInsert.onCreated(function() {
	
});

Template.ContractsInsert.onDestroyed(function() {
	
});

Template.ContractsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ContractsInsert.events({
	
});

Template.ContractsInsert.helpers({
	
});

Template.ContractsInsertForm.onCreated(function() {
	
});

Template.ContractsInsertForm.onDestroyed(function() {
	
});

Template.ContractsInsertForm.onRendered(function() {
	

	pageSession.set("contractsInsertFormInfoMessage", "");
	pageSession.set("contractsInsertFormErrorMessage", "");

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

Template.ContractsInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contractsInsertFormInfoMessage", "");
		pageSession.set("contractsInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var contractsInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(contractsInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contractsInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("contracts", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contractsInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("contractsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("contracts", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.ContractsInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contractsInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contractsInsertFormErrorMessage");
	}
	
});
