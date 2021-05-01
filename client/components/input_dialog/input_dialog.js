/*
	InputDialog(options);

	Function renders modal confirmation dialog. Dialog is inserted into DOM and removed on close.

	"options" object example:

		{
			message: "Please enter your name",
			title: "Your name",
			onSubmit: function(text, payload) {
				alert("Submit: " + text + ", Payload: " + payload);
			},
			onCancel: function(payload) {
				alert("cancel: " + payload);
			},
			buttonSubmitTitle: "OK",
			buttonCancelTitle: "Cancel",
			multiline: true,
			text: "Just me",
			payload: null
		}

	Properties:
		message: message shown in the box (no default)
		title: modal box title (no default)
		onSubmit: function to execute if user click "OK" button (if not provided, box will simply close)
		onCancel: function to execute if user click "Cancel" button (if not provided box will simply close)
		buttonSubmitTitle: text to show on "OK" button (default: "OK")
		buttonCancelTitle: text to show on "Cancel" button (default: "Cancel")
		multiline: if set to true then multi-line textarea will be rendered, otherwise single-line input is shown (default: false)
		text: initial text to show in dialog 
		payload: onSubmit and onCancel handler will be called with this argument. For example it can be some _id useful in your program (or whatever)
*/

this.InputDialog = function(options) {
	var tmpl = Template["InputDialog"];
	var wrapper = document.body.appendChild(document.createElement("div"));
	options = options || {};
	options.wrapper = wrapper;

	options.message = options.message || "";
	options.title = options.title || "";
	options.buttonSubmitTitle = options.buttonSubmitTitle || "OK";
	options.buttonCancelTitle = options.buttonCancelTitle || "Cancel";
	options.multiline = options.multiline || false;
	options.text = options.text || "";

	Blaze.renderWithData(tmpl, options, wrapper);
};

Template.InputDialog.onRendered(function() {
	var self = this;
	this.$(".modal").modal();
	this.$(".modal").on("hidden.bs.modal", function (e) {
		self.data.wrapper.remove();
	});

	Meteor.defer(function() {
		self.$("input[type='text'],textarea").on("focus", function(e, t) {
			$(this).select();
		});

		self.$("input[autofocus],textarea[autofocus]").focus();
	});
});

Template.InputDialog.events({
	"click .close-button, click .cancel-button": function(e, t) {
		if(this.onCancel) {
			this.onCancel(this.payload);
		}
	},

	"click .submit-button": function(e, t) {
		var text = t.$(".input-control").val();
		if(this.onSubmit) {
			this.onSubmit(text, this.payload);
		}
	}
});
