console.log('loading contractController.js');

ContractController = RouteController.extend({

	action: async function() {

		switch (this.method) {

		case 'GET':

			const {chain, contract} = this.params.query;

			if (chain && contract) {

				this.response.end('OK');
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
