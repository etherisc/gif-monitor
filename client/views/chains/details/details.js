var pageSession = new ReactiveDict();

Template.ChainsDetails.onCreated(function() {
	
});

Template.ChainsDetails.onDestroyed(function() {
	
});

Template.ChainsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ChainsDetails.events({
	
});

Template.ChainsDetails.helpers({
	
});

Template.ChainsDetailsForm.onCreated(function() {
	
});

Template.ChainsDetailsForm.onDestroyed(function() {
	
});

Template.ChainsDetailsForm.onRendered(function() {
	

	pageSession.set("chainsDetailsFormInfoMessage", "");
	pageSession.set("chainsDetailsFormErrorMessage", "");

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

Template.ChainsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("chainsDetailsFormInfoMessage", "");
		pageSession.set("chainsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var chainsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(chainsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("chainsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("chainsDetailsFormErrorMessage", message);
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

		Router.go("chains", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("chains", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ChainsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("chainsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("chainsDetailsFormErrorMessage");
	}
	
});
