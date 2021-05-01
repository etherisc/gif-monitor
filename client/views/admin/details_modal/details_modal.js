var pageSession = new ReactiveDict();

Template.AdminDetailsModal.onCreated(function() {
	
});

Template.AdminDetailsModal.onDestroyed(function() {
	
});

Template.AdminDetailsModal.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminDetailsModal.events({
	
});

Template.AdminDetailsModal.helpers({
	
});

Template.AdminDetailsModalForm.onCreated(function() {
	
});

Template.AdminDetailsModalForm.onDestroyed(function() {
	
});

Template.AdminDetailsModalForm.onRendered(function() {
	// console.log(this);

$('.control-field-args .code').jsonViewer(this.data.logline.args);

	pageSession.set("adminDetailsModalFormInfoMessage", "");
	pageSession.set("adminDetailsModalFormErrorMessage", "");

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

Template.AdminDetailsModalForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminDetailsModalFormInfoMessage", "");
		pageSession.set("adminDetailsModalFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminDetailsModalFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminDetailsModalFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminDetailsModalFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminDetailsModalFormErrorMessage", message);
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

		/*BACK_REDIRECT*/
	}

	
});

Template.AdminDetailsModalForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminDetailsModalFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminDetailsModalFormErrorMessage");
	}
	
});
