var pageSession = new ReactiveDict();

Template.MetadataDetails.onCreated(function() {
	
});

Template.MetadataDetails.onDestroyed(function() {
	
});

Template.MetadataDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.MetadataDetails.events({
	
});

Template.MetadataDetails.helpers({
	
});

Template.MetadataDetailsBpDoc.created = function() {

};

Template.MetadataDetailsBpDoc.destroyed = function() {

};

Template.MetadataDetailsBpDoc.rendered = function() {

};

Template.MetadataDetailsBpDoc.helpers({

});

Template.MetadataDetailsBpDoc.events({

});

Template.MetadataDetailsForm.onCreated(function() {
	
});

Template.MetadataDetailsForm.onDestroyed(function() {
	
});

Template.MetadataDetailsForm.onRendered(function() {
	

	pageSession.set("metadataDetailsFormInfoMessage", "");
	pageSession.set("metadataDetailsFormErrorMessage", "");

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

Template.MetadataDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("metadataDetailsFormInfoMessage", "");
		pageSession.set("metadataDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var metadataDetailsFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(metadataDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("metadataDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("metadataDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("metadataInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

		Router.go("metadata", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.MetadataDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("metadataDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("metadataDetailsFormErrorMessage");
	}
	
});
