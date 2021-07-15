console.log('loading helpers.js');

import { ethers } from 'ethers';
import { bpDoc  } from '/client/lib/bp-doc.js';
import utils from '/client/lib/utils.js';

Helpers = { ...utils };
	
Helpers.productState = (state) => stateMessage.product[state];
Helpers.oracleState = (state) => stateMessage.oracle[state];
Helpers.oracleTypeState = (state) => stateMessage.oracleType[state];
Helpers.oracleAssigmentState = (state) => stateMessage.oracleAssignment[state];
Helpers.policyState = (state) => stateMessage.policy[state];
Helpers.applicationState = (state) => stateMessage.application[state];
Helpers.claimState = (state) => stateMessage.claim[state];
Helpers.policyFlowState = (state) => stateMessage.policyFlow[state];
Helpers.payoutState = (state) => stateMessage.payout[state];

Helpers.isProductState = (state, data) => stateMessage.product[data.product.state] === state;

/********************* INSERT NEW HELPERS ABOVE *************************/


/* Register all Helpers */

_.each(Helpers, function (helper, key) {
	Handlebars.registerHelper(key, helper);
});




