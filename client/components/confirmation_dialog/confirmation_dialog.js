/*
	ConfirmationDialog(options);

	Function renders modal confirmation dialog. Dialog is inserted into DOM and removed on close.

	"options" object example:

		{
			message: "Are you sure you want to delete?",
			title: "Delete",
			onYes: function(id) {
				alert("yes: " + id);
			},
			onNo: function(id) {
				alert("no: " + id);
			},
			onCancel: function(id) {
				alert("cancel: " + id);
			},
			buttonYesTitle: "Yes",
			buttonNoTitle: "No",
			buttonCancelTitle: "Cancel",
			showCancelButton: true,
			payload: itemId
		}

	Properties:
		message: message shown in the box (no default)
		title: modal box title (no default)
		onYes: function to execute if user click "Yes" button (if not provided, box will simply close)
		onNo: function to execute if user click "No" button (if not provided, box will simply close)
		onCancel: function to execute if user click "Cancel" button (if not provided "onNo" handler will be called. If no handler provided box will simply close)
		buttonYesTitle: text to show on "Yes" button (default: "Yes")
		buttonNoTitle: text to show on "No" button (default: "No")
		buttonCancelTitle: text to show on "Cancel" button (default: "Cancel")
		showCancelButton: show cancel button? (default: false)
		payload: onYes, onNo and onCancel handler will be called with this argument. For example it can be _id of item to delete (or whatever)
*/

this.ConfirmationDialog = function(options) {
	var tmpl = Template["ConfirmationDialog"];
	var wrapper = document.body.appendChild(document.createElement("div"));
	options = options || {};
	options.wrapper = wrapper;

	options.message = options.message || "";
	options.title = options.title || "";
	options.buttonYesTitle = options.buttonYesTitle || "Yes";
	options.buttonNoTitle = options.buttonNoTitle || "No";
	options.buttonCancelTitle = options.buttonCancelTitle || "Cancel";
	options.showCancelButton = options.showCancelButton || false;

	Blaze.renderWithData(tmpl, options, wrapper);
};

Template.ConfirmationDialog.onRendered(function() {
	var self = this;
	this.$(".modal").modal();
	this.$(".modal").on("hidden.bs.modal", function (e) {
		self.data.wrapper.remove();
	});
});

Template.ConfirmationDialog.events({
	"click .close-button, click .cancel-button": function(e, t) {
		if(this.onCancel) {
			this.onCancel(this.payload);
		} else {
			if(this.onNo) {
				this.onNo(this.payload);
			}
		}
	},

	"click .yes-button": function(e, t) {
		if(this.onYes) {
			this.onYes(this.payload);
		}
	},

	"click .no-button": function(e, t) {
		if(this.onNo) {
			this.onNo(this.payload);
		}
	}
});
