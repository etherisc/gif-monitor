
const formProposeOracleType = `
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

	toast_form('Propose new OracleType:', formProposeOracleType, {
		// Buttons:
		confirm: {
			label: 'Propose OracleType',
			className: "btn btn-warning pull-left",
			callback: function() {

				const otName = $('form #ot-name').val();
				const otInputSignature = $('form #ot-input-signature').val();
				const otCallbackSignature = $('form #ot-callback-signature').val();
				const otDescription = $('form #ot-description').val();

				if (
					!otName || otName === '' || 
					!otInputSignature || otInputSignature === '' || 
					!otCallbackSignature || otCallbackSignature === '') {
					alert('Please provide values for name, input signature and callback signature');
					console.log('bla');
					return false;
				}
				console.log('All ok');
				callProposeOracleType(otName, otInputSignature, otCallbackSignature, otDescription)
				.then((res) => {
					console.log(res);
					return res;
				})
				.catch((err) => {
					console.log(err);
					return false;
				});
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

};

const formAssignOracles = (oracleTypeName, assignedOracles) => {
	
	const html = `
<div class="form-content">
	<form class="form" role="form">
		<div class="form-group">
			<label for="ot-name">Oracle type name</label>
			<span>${oracleTypeName}</span>
		</div>
		${assignedOracles.filter(item => item.assignmentState === 1).map(item => {
			return `<div class="checkbox"><label><input id="oracle-${item.oracleId}" type="checkBox"> ${item.oracleDescription} (ID =${item.oracleId})</label></div>`
		}).join("\n")}
	</form>
</div>
`;
	return html;
};


assignOracles = async (oracleType) => {

	const assignedOracles = await new Promise((resolve, reject) => {
		Meteor.call('getAssignedOracles', oracleType.name, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			};
		});
	
	if (assignedOracles.length === 0) {
		alert('No proposed oracles');
		return;
	};
	
	toast_form('Assign Oracles to Oracletype:', formAssignOracles(oracleType.name, assignedOracles), {

		// Buttons:
		
		confirm: {
			label: 'Assign Oracles',
			className: "btn btn-warning pull-left",
			callback: function() {

				assignedOracles.forEach(item => {

					const doAssign = $(`form #oracle-${item.oracleId}`).val();

					if (doAssign) {
						callAssignOracleToOracleType(item.oracleTypeName, item.oracleId)
						.then((res) => {
							console.log(res);
						})
						.catch((err) => {
							console.log(err);
						});
					}
				});

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


};