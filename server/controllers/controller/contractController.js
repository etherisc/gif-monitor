console.log('loading contractController.js');

ContractController = RouteController.extend({

	action: async function() {

		switch (this.method) {

		case 'GET':

			const {instance_id, contract} = this.params.query;

			if (instance_id && contract) {
	
				const contract = Contracts.find({instance_id, contract});
				const content = JSON.stringify(contract);

				this.response.end(content);
				return;
			}

			break; // invalid

		case 'POST': 

			break;	// not allowed

		}	

		this.response.writeHead(502);
		this.response.end('Invalid method/data');
	}

});
