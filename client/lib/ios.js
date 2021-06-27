import { ethers } from 'ethers';

function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) 
		month = '0' + month;
	if (day.length < 2) 
		day = '0' + day;

	return [year, month, day].join('/');
}


reloadProduct = async (productId) => {

	Meteor.call('product.reload', { productId });

}

const handleError = (message, args) => {
	alert(message),
		error(message, args);
}

const handleInfo = (message, args) => {
	alert(message),
		info(message, args);
}


setProductStateAsync = async (productId, stateStr) => {

	const ios = await getContract('InstanceOperatorService');
	const license = await getContract('License');	

	const state = stateMessage.product.indexOf(stateStr);
	if (state < 0) throw new Error(`Invalid product state ${stateSTr}`);
	
	
	if (!ios || !license) {
		handleError(`Could not create contract instances (ios/license)`);
		return;
	}


	let product;

	try {
		product = await license.products(productId);
	} catch (err) {
		handleError(`Could not access product ${productId}; (${err.message})`);
		return;
	}

	info(`Set product state to ${stateMessage.product[state]} for product #${productId} ${b32s(product.name)}`, product);

	if(state !== product.state) {
		try {
			const res = await ios.setProductState(productId, state)
			info(`Transaction submitted`, res);
			const receipt = await res.wait();
			info(`Transaction confirmed`, receipt);
			await reloadProduct(productId);
		} catch (err) {
			handleError(`${err.message} ${err.data ? `Code: ${err.data.code} ${err.data.message}` : ''}`, err);
		}
	} else {
		handleInfo(`Product ${product.name} already in state ${stateMessage.product[state]}`);
	}
}

setProductState = (productId, stateStr) => {
	
	setProductStateAsync(productId, stateStr)
	.then((res) => {
	})
	.catch((err) => {
	});
}