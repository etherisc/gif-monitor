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

	console.log('1');
	await connectMetamask();
	console.log('2');

	if (contracts[contractName]) {
		const contractConfig = contracts[contractName];
		info(`Contract ${contractName} already loaded.`, contractConfig);
		return contractConfig;
	}		
	console.log('3');

	const contractConfig = Contracts.findOne({name: contractName});
	if (!contractConfig) {
		alert(`Contract ${contractName} not found!`);
		return null;
	}
	console.log('4');

	const Contract = new ethers.Contract(
		contractConfig.address, 
		contractConfig.abi, 
		signer
	);		
	console.log('5');

	contracts[contractName] = Contract;
	info(`Contract ${contractName} loaded.`, contractConfig);

	return Contract;
};