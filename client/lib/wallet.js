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

	if (contracts[contractName]) return contracts[contractName];

	const contractConfig = Contracts.findOne({name: contractName});
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

	return Contract;
};