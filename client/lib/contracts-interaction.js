import { ethers } from 'ethers';
import utils from '/client/lib/utils.js';

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
			Meteor.call('reloadSingleProduct', productId);
		} catch (err) {
			handleError(`${err.message} ${err.data ? `Code: ${err.data.code} ${err.data.message}` : ''}`, err);
		}
	} else {
		handleInfo(`Product ${product.name} already in state ${stateMessage.product[state]}`);
	}
}

callProposeOracleType = async (oracleTypeName, inputSignature, callbackSignature, description) => {

	const oracleOwnerService = await getContract('OracleOwnerService');
	info(`Call proposeOracleType ${oracleTypeName}`);
	try {
		const res = await oracleOwnerService.proposeOracleType(utils.s32b(oracleTypeName), inputSignature, callbackSignature, description);
		info(`Transaction submitted`, res);
		const receipt = await res.wait();
		info(`Transaction confirmed`, receipt);
		Meteor.call('loadOracleTypes');
		return true;
	} catch (err) {
		handleError(`${err.message} ${err.data ? `Code: ${err.data.code} ${err.data.message}` : ''}`, err);
		return false;
	}

}

callAssignOracleToOracleType = async (oracleTypeName, oracleId) => {

	const instanceOwnerService = await getContract('InstanceOperatorService');
	info(`Call assignOracleToOracleType oracleId=${oracleId} oracleType=${oracleTypeName} `);
	try {
		const res = await instanceOwnerService.assignOracleToOracleType(utils.s32b(oracleTypeName), oracleId);
		info(`Transaction submitted`, res);
		const receipt = await res.wait();
		info(`Transaction confirmed`, receipt);
		Meteor.call('loadOracleTypes');
		return true;
	} catch (err) {
		handleError(`${err.message} ${err.data ? `Code: ${err.data.code} ${err.data.message}` : ''}`, err);
		return false;
	}

}

callActivateOracle = async (oracleId) => {

	const instanceOwnerService = await getContract('InstanceOperatorService');
	info(`Call activateOracle oracleId=${oracleId}`);
	try {
		const res = await instanceOwnerService.activateOracle(oracleId);
		info(`Transaction submitted`, res);
		const receipt = await res.wait();
		info(`Transaction confirmed`, receipt);
		Meteor.call('loadOracles');
		return true;
	} catch (err) {
		handleError(`${err.message} ${err.data ? `Code: ${err.data.code} ${err.data.message}` : ''}`, err);
		return false;
	}

};

callActivateOracleType = async (oracleTypeName) => {

	const instanceOwnerService = await getContract('InstanceOperatorService');
	info(`Call activateOracleType oracleType=${oracleTypeName} `);
	try {
		const res = await instanceOwnerService.activateOracleType(utils.s32b(oracleTypeName));
		info(`Transaction submitted`, res);
		const receipt = await res.wait();
		info(`Transaction confirmed`, receipt);
		Meteor.call('loadOracleTypes');
		return true;
	} catch (err) {
		handleError(`${err.message} ${err.data ? `Code: ${err.data.code} ${err.data.message}` : ''}`, err);
		return false;
	}

};
