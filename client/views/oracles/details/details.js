var pageSession = new ReactiveDict();

Template.OraclesDetails.onCreated(function() {
	
});

Template.OraclesDetails.onDestroyed(function() {
	
});

Template.OraclesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.OraclesDetails.events({
	
});

Template.OraclesDetails.helpers({
	
});

Template.OraclesDetailsForm.onCreated(function() {
	
});

Template.OraclesDetailsForm.onDestroyed(function() {
	
});

Template.OraclesDetailsForm.onRendered(function() {
	

	pageSession.set("oraclesDetailsFormInfoMessage", "");
	pageSession.set("oraclesDetailsFormErrorMessage", "");

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

Template.OraclesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("oraclesDetailsFormInfoMessage", "");
		pageSession.set("oraclesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var oraclesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(oraclesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("oraclesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("oraclesDetailsFormErrorMessage", message);
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

		Router.go("oracles", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("oracles", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.OraclesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("oraclesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("oraclesDetailsFormErrorMessage");
	}
	
});

Template.OraclesDetailsFormCustomActions.created = function() {

};

Template.OraclesDetailsFormCustomActions.destroyed = function() {

};

Template.OraclesDetailsFormCustomActions.rendered = function() {

};

Template.OraclesDetailsFormCustomActions.helpers({

});

Template.OraclesDetailsFormCustomActions.events({
	"click #btn-activate": function (e,t) {
		e.preventDefault();

		callActivateOracle(t.data.oracle_type.oracleId);
	}

});
