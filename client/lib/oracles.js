
const formHtml = `
<div class="form-content">
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
		<div class="form-group">
			<label for="ot-description">Description</label>
			<input type="text" class="form-control" id="ot-description" name="ot-description" placeholder="Enter description">
		</div>
	</form>
</div>
`;

proposeOracleType = () => {

	toast_form('Propose new OracleType:', formHtml, {
		// Buttons:
		confirm: {
			label: 'Propose OracleType',
			className: "btn btn-warning pull-left",
			callback: async function() {

				const otName = $('form #ot-name').val();
				const otInputSignature = $('form #ot-input-signature').val();
				const otCallbackSignature = $('form #ot-callback-signature').val();
				const otDescription = $('form #ot-description').val();

				if (
					!otName || otName === '' || 
					!otInputSignature || otInputSignature === '' || 
					!otCallbackSignature || otCallbackSignature === '') {
					alert('Please provide values for name, input signature and callback signature');
					return false;
				}

				const success = await callProposeOracleType(otName, otInputSignature, otCallbackSignature, otDescription);
				return success;
			}

		},
		close: {
			label: 'Cancel',
			className: "btn btn-primary pull-right",
			callback: function() {
				return true;
			}

		}
	})
	.then((result) => {

		console.log(`Calling oracleOwnerService ${result}`);


	})
	.catch((err) => {
		console.log(err);
	});

}