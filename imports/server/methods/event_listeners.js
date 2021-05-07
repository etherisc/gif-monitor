import { addListener } from "/imports/server/methods/gif-logs-reader.js";
import { reloadSingleProduct } from "/imports/server/methods/gif-products-reader.js";


const reloadSingleProductFromLog = (eventData, decodedLog) => {
	
	reloadSingleProduct({productId: decodedLog.productId});
	
};

addListener(["LogNewProduct", "LogProductApproved"], reloadSingleProductFromLog );

