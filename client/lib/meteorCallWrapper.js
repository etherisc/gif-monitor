
console.log('loading meteorCallWrapper.js');

logger = {};

logger.info = function (message, args={}, source = 'browser') {
	Meteor.call('logger.info', {message, args, source});
};


logger.error = function (message, args={}, source = 'browser') {
	Meteor.call('logger.error', {message, args, source});
};


meteorCallback = function (method) {
	return function (err, res)  {
		if (err) {
			logger.error(method, {err});
			toast_error('An unexpected error occured (' + method + ')');
		} else {
			if (res && res.err) {
				logger.error(method + ' error', {err: res.err});
				toast_error(
					'An unexpected error occured (' + 
					method + 
					'; Error: ' + 
					res.err +
					')'
				);
			} else {				
				logger.info(method + ' result', {res});
				toast_info(method + ' was successful.');
			}
		}
	}
};

MeteorCall = function(methodName, args, cb=null) {
	logger.info('MeteorCall: ', methodName, args);
	Meteor.call(methodName, args, meteorCallback(methodName, cb));
};

MeteorCallAsync = async function(methodName, args) {

	return await new Promise ((resolve, reject) => {

		MeteorCall(methodName, args, function (err, res) {

			if(err) {
				reject(err);
			} else {
				resolve(res);
			}

		});

	});
};

loadEvents = async function(contract) {

	MeteorCall(
		'loadEvents', 
		{
			contract
		}, 
		meteorCallback('Load Events')
	);

};
