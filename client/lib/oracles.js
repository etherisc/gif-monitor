
proposeOracleType = () => {

	toast_prompt('Please enter the signature', {title: 'Enter oracleType Signature', inputType: 'textarea'})
	.then((result) => {
		
		console.log(`Calling oracleOwnerService ${result}`);
		
		
	})
	.catch((err) => {
	});
	
}