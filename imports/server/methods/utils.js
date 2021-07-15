console.log('loading utils.js');


const ipfsGateway = () => Settings.findOne({key: 'ipfs.gateway'});
const blockExplorer = () => Settings.findOne({key: 'chains.xdai.explorer'});

									
module.exports = {
	ipfsGateway,
	blockExplorer
};
