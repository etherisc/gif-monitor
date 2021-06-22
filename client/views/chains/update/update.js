var pageSession = new ReactiveDict();

Template.ChainsUpdate.onCreated(function() {
	
});

Template.ChainsUpdate.onDestroyed(function() {
	
});

Template.ChainsUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ChainsUpdate.events({
	
});

Template.ChainsUpdate.helpers({
	
});

Template.ChainsUpdateForm.onCreated(function() {
	
});

Template.ChainsUpdateForm.onDestroyed(function() {
	
});

Template.ChainsUpdateForm.onRendered(function() {
	

	pageSession.set("chainsUpdateFormInfoMessage", "");
	pageSession.set("chainsUpdateFormErrorMessage", "");

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

Template.ChainsUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("chainsUpdateFormInfoMessage", "");
		pageSession.set("chainsUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var chainsUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(chainsUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("chainsUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("chains", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("chainsUpdateFormErrorMessage", message);
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

Template.ChainsUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("chainsUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("chainsUpdateFormErrorMessage");
	}
	
});
