var pageSession = new ReactiveDict();

Template.AdminSettingsPageUpdate.onCreated(function() {
	
});

Template.AdminSettingsPageUpdate.onDestroyed(function() {
	
});

Template.AdminSettingsPageUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminSettingsPageUpdate.events({
	
});

Template.AdminSettingsPageUpdate.helpers({
	
});

Template.AdminSettingsPageUpdateForm.onCreated(function() {
	
});

Template.AdminSettingsPageUpdateForm.onDestroyed(function() {
	
});

Template.AdminSettingsPageUpdateForm.onRendered(function() {
	

	pageSession.set("adminSettingsPageUpdateFormInfoMessage", "");
	pageSession.set("adminSettingsPageUpdateFormErrorMessage", "");

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

Template.AdminSettingsPageUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminSettingsPageUpdateFormInfoMessage", "");
		pageSession.set("adminSettingsPageUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminSettingsPageUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminSettingsPageUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminSettingsPageUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.settings_page", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminSettingsPageUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("settingsUpdate", t.data.setting._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.AdminSettingsPageUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminSettingsPageUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminSettingsPageUpdateFormErrorMessage");
	}
	
});
