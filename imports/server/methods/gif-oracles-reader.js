/* GIF Oracles Reader */

console.log('loading gif-oracles-reader.js');

const ethers = require('ethers');
const abiDecoder = require('abi-decoder');


const loadOracles = async() => {

	try {
		const Query = await getContract('Query');

		const oracleCount = await Query.oracleCount();
		info(`${oracleCount} Oracles found`);

		for (var oracleIndex = 1; oracleIndex <= oracleCount; oracleIndex += 1) {
			const oracle = await Query.oracles(oracleIndex);

			info(`Found oracle #${oracleIndex} (${oracle.description})`, { oracle });

			Oracles.upsert({oracle_contract: oracle.oracleContract}, {$set: {
				oracle_id: oracleIndex,
				name: b32s(oracle.name),
				oracle_contract: oracle.oracleContract,
				state: oracle.state,
				active_oracle_types: oracle.activeOracleTypes.toNumber()			
			}})	
		}
	} catch (err) {
		error(`Error fetching oracles, ${err.message}`);
		return;
	}

};


const loadOracleTypes = async() => {

	try {
		const Query = await getContract('Query');
		const oracleTypeNamesCount = await Query.oracleTypeNamesCount();
		info(`${oracleTypeNamesCount} OracleTypes found`);
		const oracleCount = await Query.oracleCount();
		info(`${oracleCount} Oracles found`);

		for (var oracleTypeIndex = 1; oracleTypeIndex <= oracleTypeNamesCount; oracleTypeIndex += 1) {
			const oracleTypeNameB32 = await Query.oracleTypeNames(oracleTypeIndex);
			const oracleTypeName = b32s(oracleTypeNameB32);
			const oracleType = await Query.oracleTypes(oracleTypeNameB32);

			info(`Found oracleType ${oracleTypeName}`, { oracleType });
			
			const assignedOracles = [];
			for (var idx = 1; idx <= oracleCount; idx += 1) {
				const assignmentState = await Query.assignedOracles(oracleTypeNameB32, idx);
				if (assignmentState > 0) {
					assignedOracles.push({oracleId: idx, assignmentState});
				}
			}
			
			OracleTypes.upsert({name: oracleTypeName}, {$set: {
				index: oracleTypeIndex,
				input_format: oracleType.inputFormat,
				callback_format: oracleType.callbackFormat,
				state: oracleType.state,
				active_oracles: oracleType.activeOracles.toNumber(),
				assigned_oracles: assignedOracles
			}});
		}
	} catch (err) {
		error(`Error fetching oracles, ${err.message}`);
		return;
	}

};

const getAssignedOracles = (name) => {
	const oracleType = OracleTypes.findOne({name});
	
	return oracleType.assigned_oracles.map(item => {
		const oracle = Oracles.findOne({oracle_id: item.oracleId});
		return {
			oracleTypeName: name, 
			oracleId: item.oracleId, 
			assignmentState: item.assignmentState
		};
	});
}


const getAssignedOracleTypes = (oracle_id) => {
	
	const oracleTypes =  OracleTypes.find(
		{
			assigned_oracles: {
				$elemMatch: {
					oracleId: {
						$eq: oracle_id
					}
				}
			}
		}).fetch();
	console.log(oracle_id, oracleTypes);
	return oracleTypes.map(item => ({
		oracleTypeName: item.name, 
		oracleId: oracle_id, 
		assignmentState: item.assignmentState
	}));
}


const reloadOracles = () => {

	Oracles.remove({});
	loadOracles();

}

const reloadOracleTypes = () => {

	OracleTypes.remove({});
	loadOracleTypes();

}


module.exports = { 
	loadOracles, 
	loadOracleTypes, 
	reloadOracles, 
	reloadOracleTypes, 
	getAssignedOracles, 
	getAssignedOracleTypes 
};

