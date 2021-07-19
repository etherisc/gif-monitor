
console.log('loading toast.js');


toast_error = function(message, options) {

	error('Toast error: ' + message);

	bootbox.alert({
		title: '<span style="color:red; font-weight:bold;">Error</span>',
		message: message,
		backdrop: true,
		...options
	});

};

toast_autoclose = function(title, color, message, options) {

	var dialog = bootbox.dialog({
		title: '<span style="color:' + (color || 'black') + '; font-weight:bold;">' + title + '</span>',
		message: message,
		onEscape: true,
		buttons: {
			confirm: {
				label: '<i class="fa fa-check"></i> OK'
			}
		},
		backdrop: true,
		...options
	});

	dialog.init(function(){
		setTimeout(function(){
			dialog.modal('hide');
		}, 3000);
	});
};

toast_success = function(message, options) {

	info('Toast success: ' + message);
	toast_autoclose('Success', 'green', message, options);

};

toast_info = function(message, options) {

	info('Toast info: ' + message);
	toast_autoclose('Info', 'blue', message, options);

};

toast_warning = function(message, options) {

	info('Toast warning: ' + message);
	toast_autoclose('Warning', 'red', message, options);

};

toast_confirm = function(message, options) {

	info('Toast confirm: ' + message);
	return new Promise((resolve, reject) => {
		bootbox.confirm({
			title: '<span style="color:blue; font-weight:bold;">Confirm</span>',
			message: message,
			backdrop: true,
			buttons: {
				confirm: {
					label: 'Yes',
					className: 'btn-success'
				},
				cancel: {
					label: 'No',
					className: 'btn-danger'
				}
			},
			callback: function (result) {
				info('Toast confirm result: ' + result);	
				resolve(result);
			},
			...options
		});
	});

};

toast_prompt = function(message, options) {

	info('Toast prompt: ' + message);
	return new Promise((resolve, reject) => {
		bootbox.prompt({
			title: `<span style="color:blue; font-weight:bold;">${message}</span>`,
			backdrop: true,
			buttons: {
				confirm: {
					label: 'Yes',
					className: 'btn-success'
				},
				cancel: {
					label: 'No',
					className: 'btn-danger'
				}
			},
			callback: function (result) {
				info('Toast confirm result: ' + result);	
				resolve(result);
			}, 
			...options
		});
	});
}

toast_form = function(title, formHtml, buttons, options) {
	info(`Toast dialog ${title}`, formHtml);
	console.log(formHtml);
	return new Promise((resolve, reject) => {
		bootbox.dialog({
			title: `<span style="color:blue; font-weight:bold;">${title}</span>`,
			message: formHtml,
			backdrop: true,
			buttons, 
			onEscape: function() {
				modal.modal("hide");
			}
			...options
		});
	});
}
