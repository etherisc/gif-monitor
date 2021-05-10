
import logger from '/imports/server/methods/logger.js';

import { reloadContracts } from '/imports/server/methods/gif-contracts-reader.js';
import { reloadEvents } from '/imports/server/methods/gif-logs-reader.js';
import { reloadOracles } from '/imports/server/methods/gif-oracles-reader.js';
import { reloadProducts, reloadSingleProduct } from '/imports/server/methods/gif-products-reader.js';
import {
	
	reloadMetadata, reloadSingleMetadata,
	reloadApplications, reloadSingleApplication,
	reloadPolicies, reloadSinglePolicy
	
} from '/imports/server/methods/gif-policies-reader.js';

Meteor.methods({

	"logger.info": logger.method_info,
	"logger.error": logger.method_error,
	"logger.warning": logger.method_warning,
	"logger.clear": logger.method_clear,
	
	"reload.events": reloadEvents,
	"reload.contracts": reloadContracts,
	"reload.oracles": reloadOracles,

	"reload.products": reloadProducts,
	"product.reload": reloadSingleProduct,
	"reload.metadata": reloadMetadata,
	"metadata.reload": reloadSingleMetadata,
	"reload.applications": reloadApplications,
	"application.reload": reloadSingleApplication,
	"reload.policies": reloadPolicies,
	"policy.reload": reloadSinglePolicy

});
