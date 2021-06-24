var pageSession = new ReactiveDict();

Template.InstancesUpdate.onCreated(function() {
	
});

Template.InstancesUpdate.onDestroyed(function() {
	
});

Template.InstancesUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.InstancesUpdate.events({
	
});

Template.InstancesUpdate.helpers({
	
});

Template.InstancesUpdateForm.onCreated(function() {
	
});

Template.InstancesUpdateForm.onDestroyed(function() {
	
});

Template.InstancesUpdateForm.onRendered(function() {
	

	pageSession.set("instancesUpdateFormInfoMessage", "");
	pageSession.set("instancesUpdateFormErrorMessage", "");

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

Template.InstancesUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("instancesUpdateFormInfoMessage", "");
		pageSession.set("instancesUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var instancesUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(instancesUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("instancesUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("instances", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("instancesUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("instancesUpdate", t.data.instance._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.InstancesUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("instancesUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("instancesUpdateFormErrorMessage");
	}
	
});
