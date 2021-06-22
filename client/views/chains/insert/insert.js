var pageSession = new ReactiveDict();

Template.ChainsInsert.onCreated(function() {
	
});

Template.ChainsInsert.onDestroyed(function() {
	
});

Template.ChainsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ChainsInsert.events({
	
});

Template.ChainsInsert.helpers({
	
});

Template.ChainsInsertForm.onCreated(function() {
	
});

Template.ChainsInsertForm.onDestroyed(function() {
	
});

Template.ChainsInsertForm.onRendered(function() {
	

	pageSession.set("chainsInsertFormInfoMessage", "");
	pageSession.set("chainsInsertFormErrorMessage", "");

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

Template.ChainsInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("chainsInsertFormInfoMessage", "");
		pageSession.set("chainsInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var chainsInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(chainsInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("chainsInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("chains", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("chainsInsertFormErrorMessage", message);
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

		

		Router.go("chains", mergeObjects(Router.currentRouteParams(), {}));
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

Template.ChainsInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("chainsInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("chainsInsertFormErrorMessage");
	}
	
});
