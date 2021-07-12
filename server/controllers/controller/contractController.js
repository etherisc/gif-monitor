ContractController = RouteController.extend({

	action: async function() {
	
		console.log(this.method, this.params, this.request.body, this.query);
	
		switch (this.method) {
	
		case 'GET':

			this.response.end('OK');
			return;
	
		case 'POST': 
		
			break;	// not allowed
	
		}	
	
		this.response.writeHead(502);
		this.response.end('Invalid method/data');
	}


});
