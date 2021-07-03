var pageSession = new ReactiveDict();

Template.AdminSettingsPageDetails.onCreated(function() {
	
});

Template.AdminSettingsPageDetails.onDestroyed(function() {
	
});

Template.AdminSettingsPageDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminSettingsPageDetails.events({
	
});

Template.AdminSettingsPageDetails.helpers({
	
});

Template.AdminSettingsPageDetailsForm.onCreated(function() {
	
});

Template.AdminSettingsPageDetailsForm.onDestroyed(function() {
	
});

Template.AdminSettingsPageDetailsForm.onRendered(function() {
	

	pageSession.set("adminSettingsPageDetailsFormInfoMessage", "");
	pageSession.set("adminSettingsPageDetailsFormErrorMessage", "");

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

Template.AdminSettingsPageDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminSettingsPageDetailsFormInfoMessage", "");
		pageSession.set("adminSettingsPageDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminSettingsPageDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminSettingsPageDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminSettingsPageDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminSettingsPageDetailsFormErrorMessage", message);
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

		Router.go("admin.settings_page", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.settings_page", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.AdminSettingsPageDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminSettingsPageDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminSettingsPageDetailsFormErrorMessage");
	}
	
});
