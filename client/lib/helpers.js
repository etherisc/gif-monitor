console.log('loading helpers.js');

import { ethers } from 'ethers';
import { bpDoc  } from '/client/lib/bp-doc.js';
import * from '/client/lib/utils.js';

Helpers = {};

Helpers.pre = pre;
Helpers.safeStr = safeStr;
Helpers.json2Table = json2Table;
Helpers.array2Table = array2Table;
Helpers.abi2Table = abi2Table;
Helpers.bpDoc = bpDoc;

Helpers.ipfsLink = (ipfs) => safeStr(`<a href="https://gateway.pinata.cloud/ipfs/${ipfs.ipfs}" target="_blank">/ipfs/${ipfs.ipfs}</a>`);
Helpers.txLink = (txHash) => safeStr(`<a href="https://blockscout.com/xdai/mainnet/tx/${txHash}" target="_blank">${txHash.slice(0,10)}...</a>`);
Helpers.addressLink = (address) => safeStr(`<a href="https://blockscout.com/xdai/mainnet/address/${address}" target="_blank">${address.slice(0,10)}...</a>`);
Helpers.addressLongLink = (address) => safeStr(`<a href="https://blockscout.com/xdai/mainnet/address/${address}" target="_blank">${address}</a>`);
	
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




