
const formHtml = `
<div class="form-content" style="display:none;">
	<form class="form" role="form">
		<div class="form-group">
			<label for="ot-name">Oracle type name</label>
			<input type="text" class="form-control" id="ot-name" name="ot-name" placeholder="Enter oracle type name" value="">
		</div>
		<div class="form-group">
			<label for="ot-input-signature">Input signature</label>
			<input type="text" class="form-control" id="ot-input-signature" name="ot-input-signature" placeholder="Enter input signature">
		</div>
		<div class="form-group">
			<label for="ot-callback-signature">Callback signature</label>
			<input type="text" class="form-control" id="ot-callback-signature" name="ot-callback-signature" placeholder="Enter callback signature">
		</div>
	</form>
</div>
`;

proposeOracleType = () => {

	toast_form('Propose new OracleType:', formHtml, {
		// Buttons:
		confirm: {
			label: 'Propose OracleType',
			callback: function() {

				const otName = $('form #ot-name').val();
				const otInputSignature = $('form #ot-input-signature').val();
				const otCallbackSignature = $('form #ot-callback-signature').val();

				console.log(otName, otInputSignature, otCallbackSignature);
				
				return false;
			}

		}
	})
	.then((result) => {

		console.log(`Calling oracleOwnerService ${result}`);


	})
	.catch((err) => {
	});

}