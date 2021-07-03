var pageSession = new ReactiveDict();

Template.AdminSettingsPageInsert.onCreated(function() {
	
});

Template.AdminSettingsPageInsert.onDestroyed(function() {
	
});

Template.AdminSettingsPageInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminSettingsPageInsert.events({
	
});

Template.AdminSettingsPageInsert.helpers({
	
});

Template.AdminSettingsPageInsertForm.onCreated(function() {
	
});

Template.AdminSettingsPageInsertForm.onDestroyed(function() {
	
});

Template.AdminSettingsPageInsertForm.onRendered(function() {
	

	pageSession.set("adminSettingsPageInsertFormInfoMessage", "");
	pageSession.set("adminSettingsPageInsertFormErrorMessage", "");

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

Template.AdminSettingsPageInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminSettingsPageInsertFormInfoMessage", "");
		pageSession.set("adminSettingsPageInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminSettingsPageInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminSettingsPageInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminSettingsPageInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.settings_page", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminSettingsPageInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("settingsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.settings_page", mergeObjects(Router.currentRouteParams(), {}));
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

Template.AdminSettingsPageInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminSettingsPageInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminSettingsPageInsertFormErrorMessage");
	}
	
});
