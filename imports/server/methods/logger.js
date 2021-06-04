
console.log('loading logger.js');

const logger = {};


var filter = function(type, message, args, source) {

	if (message.includes('Admin')) return false;
	return true;

}

logger._logline = function (type) {

	return function (message, args, source) {

		if (!source) source = '';

		if (filter(type, message, args, source)) {

			Logs.insert({
				timestamp: Date.now(),
				type,
				source, 
				message, 
				args});
		}
	}
};

logger.info = logger._logline('info');
logger.error = logger._logline('error');
logger.warning = logger._logline('warning');

info = (message, args) => logger.info(message, args, 'server');
warning = (message, args) => logger.warning(message, args, 'server');
error = (message, args) => logger.error(message, args, 'server');

logger.method_info = function (args) { 
	logger.info(args.message, args.args, args.source);
};

logger.method_error = function (args) { 
	logger.error(args.message, args.args, args.source);
};

logger.method_warning = function (args) { 
	logger.warning(args.message, args.args, args.source);
};

logger.method_clear = function (args) {
	Logs.remove(args);
};



module.exports = logger;
