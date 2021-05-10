var pageSession = new ReactiveDict();

Template.MetadataPublicDetails.onCreated(function() {
	
});

Template.MetadataPublicDetails.onDestroyed(function() {
	
});

Template.MetadataPublicDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.MetadataPublicDetails.events({
	
});

Template.MetadataPublicDetails.helpers({
	
});

Template.MetadataPublicDetailsForm.onCreated(function() {
	
});

Template.MetadataPublicDetailsForm.onDestroyed(function() {
	
});

Template.MetadataPublicDetailsForm.onRendered(function() {
	

	pageSession.set("metadataPublicDetailsFormInfoMessage", "");
	pageSession.set("metadataPublicDetailsFormErrorMessage", "");

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

Template.MetadataPublicDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("metadataPublicDetailsFormInfoMessage", "");
		pageSession.set("metadataPublicDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var metadataPublicDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(metadataPublicDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("metadataPublicDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("metadataPublicDetailsFormErrorMessage", message);
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

		Router.go("metadata_public", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("metadata_public", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.MetadataPublicDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("metadataPublicDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("metadataPublicDetailsFormErrorMessage");
	}
	
});
