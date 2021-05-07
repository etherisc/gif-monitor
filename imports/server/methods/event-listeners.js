/* Event Listeners */

console.log('loading event-listeners.js');import { addListener } from "/imports/server/methods/gif-logs-reader.js";
import { reloadSingleProduct } from "/imports/server/methods/gif-products-reader.js";


const getValue = (name, decodedLog) => {
	return decodedLog.event.filter(value => value.name == name)[0].value;
}

const reloadSingleProductFromLog = (eventData, decodedLog) => {
	
	console.log('In reloadSingle...', decodedLog.productId);
	reloadSingleProduct({productId: parseInt(getValue('productId', decodedLog))});
	
};


const addListeners = () => {

	addListener(["LogNewProduct", "LogProductApproved"], reloadSingleProductFromLog );

};

module.exports = { addListeners };
