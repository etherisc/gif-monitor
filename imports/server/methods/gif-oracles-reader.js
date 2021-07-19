/* GIF Oracles Reader */

console.log('loading gif-oracles-reader.js');

const ethers = require('ethers');
const abiDecoder = require('abi-decoder');


const loadOracles = async() => {

	try {
		const Query = await getContract('Query');

		const oracleIdIncrement = await Query.oracleIdIncrement();
		info(`${ oracleIdIncrement - 1 } Oracles found`);

		for (var oracleIndex = 1; oracleIndex < oracleIdIncrement; oracleIndex += 1) {
			const oracle = await Query.oracles(oracleIndex);

			info(`Found oracle #${oracleIndex} (${oracle.description})`, { oracle });

			Oracles.upsert({oracle_contract: oracle.oracleContract}, {$set: {
				oracle_id: oracleIndex,
				oracle_contract: oracle.oracleContract,
				description: oracle.description,
				oracle_owner: oracle.oracleOwner,
				activated: oracle.state === 1,
				initialized: oracle.initialized,
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
		const oracleTypeNamesIncrement = await Query.oracleTypeNamesIncrement();
		info(`${ oracleTypeNamesIncrement - 1 } OracleTypes found`);
		const oracleIdIncrement = await Query.oracleIdIncrement();
		info(`${ oracleIdIncrement - 1 } Oracles found`);

		for (var oracleTypeIndex = 1; oracleTypeIndex < oracleTypeNamesIncrement; oracleTypeIndex += 1) {
			const oracleTypeNameB32 = await Query.oracleTypeNames(oracleTypeIndex);
			const oracleTypeName = b32s(oracleTypeNameB32);
			const oracleType = await Query.oracleTypes(oracleTypeNameB32);

			info(`Found oracleType ${oracleTypeName}`, { oracleType });
			
			const assignedOracles = [];
			for (var oracleIndex = 1; oracleIndex < oracleIdIncrement; oracleIndex += 1) {
				const assignmentState = await Query.assignedOracles(oracleTypeNameB32, oracleIndex);
				if (assignmentState > 0) {
					assignedOracles.push({oracleIndex, assignmentState});
				}
			}
			
			
			OracleTypes.upsert({name: oracleTypeName}, {$set: {
				index: oracleTypeIndex,
				input_format: oracleType.inputFormat,
				callback_format: oracleType.callbackFormat,
				description: oracleType.description,
				activated: oracleType.state === 1,
				initialized: oracleType.initialized,
				active_oracles: oracleType.activeOracles.toNumber(),
				assignedOracles
			}});
		}
	} catch (err) {
		error(`Error fetching oracles, ${err.message}`);
		return;
	}

};

const reloadOracles = () => {

	Oracles.remove({});
	loadOracles();

}

const reloadOracleTypes = () => {

	OracleTypes.remove({});
	loadOracleTypes();

}


module.exports = { loadOracles, loadOracleTypes, reloadOracles, reloadOracleTypes };

