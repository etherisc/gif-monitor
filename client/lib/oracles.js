
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

				if (
					!otName || otName === '' || 
					!otInputSignature || otInputSignature === '' || 
					!otCallbackSignature || otCallbackSignature === '') {
					alert('Please provide values for name, input signature and callback signature');
					return false;
				}
				callProposeOracleType(otName, otInputSignature, otCallbackSignature)
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
			return `<div class="checkbox"><label><input id="oracle-${item.oracleId}" type="checkBox"> ${item.oracleName} (ID =${item.oracleId})</label></div>`
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
	});
	
	if (assignedOracles.filter(item => item.assignmentState === 1).length === 0) {
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

const formOracleTypes = (oracleName, assignedOracleTypes) => {
	
	const html = `
<div class="form-content">
	<form class="form" role="form">
		<div class="form-group">
			<label for="ot-name">Oracle</label>
			<span>${oracleName}</span>
		</div>
		${assignedOracleTypes.map(item => {
			return `<div class="checkbox"><label><input id="oracle-type-${item.oracleTypeName}" type="checkBox"> OracleType "${item.oracleTypeName}"</label></div>`
		}).join("\n")}
	</form>
</div>
`;
	return html;
};


revokeOracleTypes = async (oracle) => {
	
	const assignedOracleTypes = await new Promise((resolve, reject) => {
		Meteor.call('getAssignedOracleTypes', oracle.oracle_id, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			};
		});
	});
			
	toast_form('Revoke Oracle from Oracletypes:', formOracleTypes(oracle.name, assignedOracleTypes), {

		// Buttons:
		
		confirm: {
			label: 'Revoke Oracle from OracleTypes',
			className: "btn btn-warning pull-left",
			callback: function() {

				assignedOracleTypes.forEach(item => {

					const doRevoke = $(`form #oracle-type-${item.oracleTypeName}`).val();

					if (doRevoke) {
						callRevokeOracleFromOracleType(item.oracleTypeName, item.oracleId)
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

proposeOracleToOracleTypes = async (oracle) => {
	
	const unassignedOracleTypes = await new Promise((resolve, reject) => {
		Meteor.call('getUnassignedOracleTypes', oracle.oracle_id, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			};
		});
	});
	
	if (unassignedOracleTypes.length === 0) {
		alert('No proposable oracle types found');
		return;
	};
			
	toast_form('Propose Oracle to Oracletypes:', formOracleTypes(oracle.name, unassignedOracleTypes), {

		// Buttons:
		
		confirm: {
			label: 'Propose Oracle to OracleTypes',
			className: "btn btn-warning pull-left",
			callback: function() {

				unassignedOracleTypes.forEach(item => {

					const doRevoke = $(`form #oracle-type-${item.oracleTypeName}`).checked;
					console.log(item.oracleTypeName, doRevoke)

					if (doRevoke) {
						callProposeOracleToOracleType(item.oracleTypeName, item.oracleId)
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
