
proposeOracleType = () => {

	toast_prompt('Please enter the signature', { inputType: 'textarea' })
	.then((result) => {
		
		console.log(`Calling oracleOwnerService ${result}`);
		
		
	})
	.catch((err) => {
	});
	
}