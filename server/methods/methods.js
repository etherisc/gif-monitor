
import logger from '/imports/server/methods/logger.js';

import { reloadContracts, getContract } from '/imports/server/methods/gif-contracts-reader.js';
import { reloadEvents } from '/imports/server/methods/gif-logs-reader.js';
import { loadOracles, reloadOracles, loadOracleTypes, reloadOracleTypes, getAssignedOracles, getAssignedOracleTypes } from '/imports/server/methods/gif-oracles-reader.js';
import { reloadProducts, reloadSingleProduct } from '/imports/server/methods/gif-products-reader.js';
import { getPolicies, reloadPolicies } from '/imports/server/methods/gif-policies-reader.js';
import { bpData } from '/imports/server/methods/bp-data.js';
import { blockExplorer, ipfsGateway } from '/imports/server/methods/utils.js';

Meteor.methods({

	"logger.info": logger.method_info,
	"logger.error": logger.method_error,
	"logger.warning": logger.method_warning,
	"logger.clear": logger.method_clear,
	
	reloadEvents,

	getContract,
	reloadContracts,
	
	loadOracles,
	loadOracleTypes,
	reloadOracles,
	reloadOracleTypes,
	getAssignedOracles,
	getAssignedOracleTypes,
	getUnassignedOracleTypes,

	reloadProducts,
	reloadSingleProduct,
	
	getPolicies,
	reloadPolicies,
	
	bpData,
	blockExplorer,
	ipfsGateway
	
});
