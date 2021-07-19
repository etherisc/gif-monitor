import { ethers } from 'ethers';

account = '';
provider = {};
signer = {};
contracts = {};

connectMetamask = async () => {

	if (account !== '') return;
	if (ethereum) {
		try {
			const accounts = await ethereum.request({method: 'eth_requestAccounts'});
			account = accounts[0];
			provider = new ethers.providers.Web3Provider(ethereum);
			signer = provider.getSigner();
		} catch (err) {
			console.log(err);
			setAccount('');
			alert('Connection denied by user.');
		}
	} else {
		alert('Please install Metamask');
	}
};


getContract = async function (contractName) {

	await connectMetamask();

	if (contracts[contractName]) {
		const contractConfig = contracts[contractName];
		info(`Contract ${contractName} already loaded.`);
		return contractConfig;
	}		

	const contractConfig = await Meteor.call('getContract', contractName);
	if (!contractConfig) {
		alert(`Contract ${contractName} not found!`);
		return null;
	}

	const Contract = new ethers.Contract(
		contractConfig.address, 
		contractConfig.abi, 
		signer
	);		

	contracts[contractName] = Contract;
	info(`Contract ${contractName} loaded.`);

	return Contract;
};