var pageSession = new ReactiveDict();

Template.InstancesDetails.onCreated(function() {
	
});

Template.InstancesDetails.onDestroyed(function() {
	
});

Template.InstancesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.InstancesDetails.events({
	
});

Template.InstancesDetails.helpers({
	
});

Template.InstancesDetailsForm.onCreated(function() {
	
});

Template.InstancesDetailsForm.onDestroyed(function() {
	
});

Template.InstancesDetailsForm.onRendered(function() {
	

	pageSession.set("instancesDetailsFormInfoMessage", "");
	pageSession.set("instancesDetailsFormErrorMessage", "");

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

Template.InstancesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("instancesDetailsFormInfoMessage", "");
		pageSession.set("instancesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var instancesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(instancesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("instancesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("instancesDetailsFormErrorMessage", message);
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

		Router.go("instances", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("instances", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.InstancesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("instancesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("instancesDetailsFormErrorMessage");
	}
	
});
