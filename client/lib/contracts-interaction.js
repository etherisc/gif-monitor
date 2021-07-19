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


const handleError = (message, args) => {
	alert(message);
	error(message, args);
}

const handleInfo = (message, args) => {
	alert(message);
	info(message, args);
}


setProductState = async (productId, stateStr) => {

	const ios = await getContract('InstanceOperatorService');
	const license = await getContract('License');	

	const state = stateMessage.product.indexOf(stateStr);
	if (state < 0) throw new Error(`Invalid product state ${stateStr}`);

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

			const method = {
				"Proposed": "disapproveProduct",
				"Approved": "approveProduct",
				"Paused": "pauseProduct"
			}[stateStr];
			const res = await ios[method](productId)
			info(`Transaction submitted`, res);
			const receipt = await res.wait();
			info(`Transaction confirmed`, receipt);
			Meteor.call('reload.singleProduct', productId);
		} catch (err) {
			handleError(`${err.message} ${err.data ? `Code: ${err.data.code} ${err.data.message}` : ''}`, err);
		}
	} else {
		handleInfo(`Product ${product.name} already in state ${stateMessage.product[state]}`);
	}
}

callProposeOracleType = async (oracleTypeName, inputSignature, callbackSignature, description) => {

	const oracleOwnerService = await getContract('OracleOwnerService');
	info(`Call Propose Oracle Type ${oracleType}`);
	try {
		const res = await oracleOwnerService.proposeOracleType(s32b(oracleTypeName), inputSignature, callbackSignature, description);
		info(`Transaction submitted`, res);
		const receipt = await res.wait();
		info(`Transaction confirmed`, receipt);
		Meteor.call('reload.oracleTypes');
		return true;
	} catch (err) {
		handleError(`${err.message} ${err.data ? `Code: ${err.data.code} ${err.data.message}` : ''}`, err);
		return false;
	}

}