
console.log('loading startup.js');


import logger from '/imports/server/methods/logger.js';
import { loadContracts } from '/imports/server/methods/gif-contracts-reader.js';
import { loadEvents } from '/imports/server/methods/gif-logs-reader.js';
import { loadOracles } from '/imports/server/methods/gif-oracles-reader.js';
import { loadProducts } from '/imports/server/methods/gif-products-reader.js';
import { addListeners } from '/imports/server/methods/event-listeners.js';

info = (message, args) => logger.info(message, args, 'server');
warning = (message, args) => logger.warning(message, args, 'server');
error = (message, args) => logger.error(message, args, 'server');

loadContracts()
	.then(() => loadEvents())
	.then(() => loadOracles())
	.then(() => loadProducts());

addListeners();

info('Server started');
