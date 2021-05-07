/* GIF Oracles Reader */

console.log('loading gif-oracles-reader.js');

const ethers = require('ethers');
const abiDecoder = require('abi-decoder');


const loadOracles = async() => {

	try {
		const Query = await getContract('Query');
		const oracleTypeNamesIncrement = await Query.oracleTypeNamesIncrement();
		info(`${ oracleTypeNamesIncrement - 1 } OracleTypes found`);

		for (var oracleTypeIndex = 0; oracleTypeIndex < oracleTypeNamesIncrement - 1; oracleTypeIndex += 1) {
			const oracleTypeNameB32 = await Query.oracleTypeNames(oracleTypeIndex);
			const oracleTypeName = ethers.utils.parseBytes32String(oracleTypeNameB32);
			const oracleType = await Query.oracleTypes(oracleTypeNameB32);

			info(`Found oracleType ${oracleTypeName}`, { oracleType });

			OracleTypes.upsert({name: oracleTypeName}, {$set: {
				index: oracleTypeIndex,
				input_format: oracleType.inputFormat,
				callback_format: oracleType.callbackFormat,
				description: oracleType.description,
				activated: oracleType.state === 1,
				initialized: oracleType.initialized,
				active_oracles: oracleType.activeOracles.toNumber()
			}})

			const oracleIdIncrement = await Query.oracleIdIncrement();
			info(`${ oracleIdIncrement - 1 } Oracles found`);

			for (var oracleIndex = 1; oracleIndex < oracleIdIncrement; oracleIndex += 1) {
				const oracle = await Query.oracles(oracleIndex);

				info(`Found oracle #${oracleIndex} (${oracle.description})`, { oracle });

				Oracles.upsert({oracle_contract: oracle.oracleContract}, {$set: {
					oracle_contract: oracle.oracleContract,
					description: oracle.description,
					oracle_owner: oracle.oracleOwner,
					activated: oracle.state === 1,
					initialized: oracle.initialized,
					active_oracle_types: oracle.activeOracleTypes.toNumber()			
				}})	
			}
		}
	} catch (err) {
		error(`Error fetching oracles, ${err.message}`);
		return;
	}

};

const reloadOracles = () => {

	Oracles.remove({});
	OracleTypes.remove({});
	loadOracles();

}


module.exports = { loadOracles, reloadOracles };

 