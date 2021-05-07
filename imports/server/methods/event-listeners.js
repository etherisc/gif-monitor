/* Event Listeners */

console.log('loading event-listeners.js');import { addListener } from "/imports/server/methods/gif-logs-reader.js";
import { reloadSingleProduct } from "/imports/server/methods/gif-products-reader.js";


const reloadSingleProductFromLog = (eventData, decodedLog) => {
	
	reloadSingleProduct({productId: decodedLog.productId});
	
};


const addListeners = () => {

	addListener(["LogNewProduct", "LogProductApproved"], reloadSingleProductFromLog );

};

module.exports = { addListeners };
