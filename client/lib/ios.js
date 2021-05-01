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



setProductPaused = async (productId, pause) => {


	const ios = await getContract('InstanceOperatorService');
	const license = await getContract('License');	
	
	if (!ios || !license) {
		alert (`Could not create contract instances`);
		return;
	}
	
	let product;
	
	try {
		product = await license.products(productId);
	} catch (err) {
		alert(`Could not access product; (${err.message})`);
		return;
	}

	if(pause && !product.paused) {
		try {
			res = await ios.pauseProduct(productId);
			alert('Transaction submitted, TxHash: ' + res.hash.slice(7) + '...');
		} catch (err) {
			alert(`${err.message} ${err.data ? `Code: ${err.data.code} ${err.data.message}` : ''}`);
		}
	} else if (!pause && product.paused) {
		try {
			res = await ios.unpauseProduct(productId);
			alert('Transaction submitted, TxHash: ' + res.hash.slice(7) + '...');
		} catch (err) {
			alert(`${err.message} ${err.data ? `Code: ${err.data.code} ${err.data.message}` : ''}`);
		}
	} else {
		alert(`Product ${product.name} already in state <${product.paused ? 'paused' : 'unpaused'}>`);
	}
}

