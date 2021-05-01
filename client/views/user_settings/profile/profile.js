var pageSession = new ReactiveDict();

Template.UserSettingsProfile.onCreated(function() {
	
});

Template.UserSettingsProfile.onDestroyed(function() {
	
});

Template.UserSettingsProfile.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.UserSettingsProfile.events({
	
});

Template.UserSettingsProfile.helpers({
	
});

Template.UserSettingsProfileEditForm.onCreated(function() {
	
});

Template.UserSettingsProfileEditForm.onDestroyed(function() {
	
});

Template.UserSettingsProfileEditForm.onRendered(function() {
	

	pageSession.set("userSettingsProfileEditFormInfoMessage", "");
	pageSession.set("userSettingsProfileEditFormErrorMessage", "");

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

Template.UserSettingsProfileEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("userSettingsProfileEditFormInfoMessage", "");
		pageSession.set("userSettingsProfileEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var userSettingsProfileEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(userSettingsProfileEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("userSettingsProfileEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("user_settings.profile", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("userSettingsProfileEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("updateUserAccount", t.data.current_user_data._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.UserSettingsProfileEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("userSettingsProfileEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("userSettingsProfileEditFormErrorMessage");
	}
	
});
