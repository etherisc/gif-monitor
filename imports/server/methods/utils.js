console.log('loading utils.js');


const ipfsGateway = () => Settings.findOne({key: 'ipfs.gateway'}).value;
const blockExplorer = () => Settings.findOne({key: 'chains.xdai.explorer'}).value;

									
module.exports = {
	ipfsGateway,
	blockExplorer
};
