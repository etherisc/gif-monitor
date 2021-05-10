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


setProductPaused = async (productId, pause) => {

	const ios = await getContract('InstanceOperatorService');
	const license = await getContract('License');	


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

	info(`Trying to ${pause ? 'pause' : 'unpause'} product #${productId} ${product.name}`, product);

	if((pause && !product.paused) || (!pause && product.paused)) {
		try {
			const res = await ios.setProductPaused(productId, pause)
			info(`Transaction submitted`, res);
			const receipt = await res.wait();
			info(`Transaction confirmed`, receipt);
			await reloadProduct(productId);
		} catch (err) {
			handleError(`${err.message} ${err.data ? `Code: ${err.data.code} ${err.data.message}` : ''}`, err);
		}
	} else {
		handleInfo(`Product ${product.name} already in state <${pause ? 'paused' : 'unpaused'}>`);
	}
}

setProductApproved = async (productId, approve) => {

	const ios = await getContract('InstanceOperatorService');
	const license = await getContract('License');	


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

	info(`Trying to ${approve ? 'approve' : 'disapprove'} product #${productId} ${product.name}`, product);

	if((approve && !product.approved) || (!approve && product.approved)) {
		try {
			const res = await ios.setProductApproved(productId, approve)
			info(`Transaction submitted`, res);
			const receipt = await res.wait();
			info(`Transaction confirmed`, receipt);
			await reloadProduct(productId);
		} catch (err) {
			handleError(`${err.message} ${err.data ? `Code: ${err.data.code} ${err.data.message}` : ''}`, err);
		}
	} else {
		handleInfo(`Product ${product.name} already in state ${approve ? 'approved' : 'disapproved'}`);
	}
}

