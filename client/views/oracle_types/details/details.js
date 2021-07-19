var pageSession = new ReactiveDict();

Template.OracleTypesDetails.onCreated(function() {
	
});

Template.OracleTypesDetails.onDestroyed(function() {
	
});

Template.OracleTypesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.OracleTypesDetails.events({
	
});

Template.OracleTypesDetails.helpers({
	
});

Template.OracleTypesDetailsForm.onCreated(function() {
	
});

Template.OracleTypesDetailsForm.onDestroyed(function() {
	
});

Template.OracleTypesDetailsForm.onRendered(function() {
	

	pageSession.set("oracleTypesDetailsFormInfoMessage", "");
	pageSession.set("oracleTypesDetailsFormErrorMessage", "");

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

Template.OracleTypesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("oracleTypesDetailsFormInfoMessage", "");
		pageSession.set("oracleTypesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var oracleTypesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(oracleTypesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("oracleTypesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("oracleTypesDetailsFormErrorMessage", message);
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

		Router.go("oracle_types", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("oracle_types", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.OracleTypesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("oracleTypesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("oracleTypesDetailsFormErrorMessage");
	}
	
});

Template.OracleTypesDetailsFormCustomActions.created = function() {

};

Template.OracleTypesDetailsFormCustomActions.destroyed = function() {

};

Template.OracleTypesDetailsFormCustomActions.rendered = function() {

};

Template.OracleTypesDetailsFormCustomActions.helpers({

});

Template.OracleTypesDetailsFormCustomActions.events({
	"click #btn-assign": function (e,t) {
		e.preventDefault();

		assignOracles(t.data);
	}
});
