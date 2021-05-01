var pageSession = new ReactiveDict();

Template.AdminUsersInsert.onCreated(function() {
	
});

Template.AdminUsersInsert.onDestroyed(function() {
	
});

Template.AdminUsersInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminUsersInsert.events({
	
});

Template.AdminUsersInsert.helpers({
	
});

Template.AdminUsersInsertInsertForm.onCreated(function() {
	
});

Template.AdminUsersInsertInsertForm.onDestroyed(function() {
	
});

Template.AdminUsersInsertInsertForm.onRendered(function() {
	

	pageSession.set("adminUsersInsertInsertFormInfoMessage", "");
	pageSession.set("adminUsersInsertInsertFormErrorMessage", "");

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

Template.AdminUsersInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminUsersInsertInsertFormInfoMessage", "");
		pageSession.set("adminUsersInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminUsersInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminUsersInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminUsersInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.users", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminUsersInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("createUserAccount", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.users", mergeObjects(Router.currentRouteParams(), {}));
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

Template.AdminUsersInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminUsersInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminUsersInsertInsertFormErrorMessage");
	}
	
});
