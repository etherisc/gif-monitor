var pageSession = new ReactiveDict();

Template.InstancesInsert.onCreated(function() {
	
});

Template.InstancesInsert.onDestroyed(function() {
	
});

Template.InstancesInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.InstancesInsert.events({
	
});

Template.InstancesInsert.helpers({
	
});

Template.InstancesInsertForm.onCreated(function() {
	
});

Template.InstancesInsertForm.onDestroyed(function() {
	
});

Template.InstancesInsertForm.onRendered(function() {
	

	pageSession.set("instancesInsertFormInfoMessage", "");
	pageSession.set("instancesInsertFormErrorMessage", "");

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

Template.InstancesInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("instancesInsertFormInfoMessage", "");
		pageSession.set("instancesInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var instancesInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(instancesInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("instancesInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("instances", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("instancesInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("instancesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("instances", mergeObjects(Router.currentRouteParams(), {}));
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

Template.InstancesInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("instancesInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("instancesInsertFormErrorMessage");
	}
	
});
