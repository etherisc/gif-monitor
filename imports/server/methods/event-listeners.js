/* Event Listeners */

console.log('loading event-listeners.js');
import { addListener } from '/imports/server/methods/gif-logs-reader.js';
import { reloadSingleProduct } from '/imports/server/methods/gif-products-reader.js';
import { getSingleMetadata } from '/imports/server/methods/gif-policies-reader.js';


const getValue = (name, decodedLog) => {
	console.log(name, decodedLog);
	return decodedLog.events.filter(value => value.name == name)[0].value;
}

const reloadSingleProductFromLog = (eventData, decodedLog) => {
	
	const productId = parseInt(getValue('productId', decodedLog));
	reloadSingleProduct({ productId });
	
};

const loadPolicy = (eventData, decodedLog) => {
	const bpKey = getValue('bpKey', decodedLog);
	getSingleMetadata(bpKey);

}


const addListeners = () => {

	addListener(['LogNewProduct', 'LogProductApproved'], reloadSingleProductFromLog );
	addListener(['LogNewMetadata', 'LogNewApplication', 'LogNewPolicy'], loadPolicy );

};

module.exports = { addListeners };
