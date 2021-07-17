

info = function (message, args={}, source = 'browser') {
	Meteor.call('logger.info', {message, args, source});
};


error = function (message, args={}, source = 'browser') {
	Meteor.call('logger.error', {message, args, source});
};
