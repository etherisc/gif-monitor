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


const callContract = async (contractName, method, args, meteorCall, meteorCallArgs) => {

	const contract = await getContract(contractName);
	if (!contract) {
		handleError(`Could not create contract instances ${contractName}`);
		return;
	};
	
	info(`Call ${contractName}.${method}`, {contractName, method, args, meteorCall, meteorCallArgs});
	try {
		console.log(args);
		const res = await contract[method](...args);
		info(`Transaction submitted`, res);
		const receipt = await res.wait();
		info(`Transaction confirmed`, receipt);
		if (meteorCall) {
			const args = meteorCallArgs ? meteorCallArgs : [];
			Meteor.call(meteorCall, ...args);
		}
		return true;
	} catch (err) {
		handleError(`${err.message} ${err.data ? `Code: ${err.data.code} ${err.data.message}` : ''}`, err);
		return false;
	}
};


setProductState = async (productId, stateStr) => {

	const ios = await getContract('InstanceOperatorService');
	const license = await getContract('License');	

	const state = utils.stateMessage.product.indexOf(stateStr);
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

	info(`Set product state to ${utils.stateMessage.product[state]} for product #${productId} ${b32s(product.name)}`, product);

	if(state !== product.state) {
		
		const method = {
			"Proposed": "disapproveProduct",
			"Approved": "approveProduct",
			"Paused": "pauseProduct"
		}[stateStr];
		await callContract(
			'InstanceOperatorService', 
			method, 
			[productId], 
			'reloadSingleProduct',
			[productId]
		); 

	} else {
		handleInfo(`Product ${product.name} already in state ${utils.stateMessage.product[state]}`);
	}
}

callProposeOracleType = async (oracleTypeName, inputSignature, callbackSignature) => {

	await callContract(
		'OracleOwnerService', 
		'proposeOracleType', 
		[utils.s32b(oracleTypeName), inputSignature, callbackSignature], 
		'loadOracleTypes'
	); 
}

callAssignOracleToOracleType = async (oracleTypeName, oracleId) => {

	await callContract(
		'InstanceOperatorService', 
		'assignOracleToOracleType', 
		[utils.s32b(oracleTypeName), oracleId], 
		'loadOraclesAndOracleTypes'
	); 

}

callApproveOracle = async (oracleId) => {

	await callContract(
		'InstanceOperatorService', 
		'approveOracle', 
		[oracleId], 
		'loadOracles'
	); 

};

callDisapproveOracle = async (oracleId) => {

	await callContract(
		'InstanceOperatorService', 
		'disapproveOracle', 
		[oracleId], 
		'loadOracles'
	); 

};

callApproveOracleType = async (oracleTypeName) => {

	await callContract(
		'InstanceOperatorService', 
		'approveOracleType', 
		[utils.s32b(oracleTypeName)], 
		'loadOracleTypes'
	); 

};

callDisapproveOracleType = async (oracleTypeName) => {

	await callContract(
		'InstanceOperatorService', 
		'disapproveOracleType', 
		[utils.s32b(oracleTypeName)], 
		'loadOracleTypes'
	); 

};

callRevokeOracleFromOracleType = async (oracleTypeName, oracleId) => {

	await callContract(
		'OracleOwnerService', 
		'revokeOracleFromOracleType', 
		[utils.s32b(oracleTypeName), oracleId], 
		'loadOraclesAndOracleTypes'
	); 

};

callProposeOracleToOracleType = async (oracleTypeName, oracleId) => {

	await callContract(
		'OracleOwnerService', 
		'proposeOracleToOracleType', 
		[utils.s32b(oracleTypeName), oracleId], 
		'loadOraclesAndOracleTypes'
	); 

};
