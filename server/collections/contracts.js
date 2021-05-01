Contracts.allow({
	insert: function (userId, doc) {
		return false;
	},

	update: function (userId, doc, fields, modifier) {
		return false;
	},

	remove: function (userId, doc) {
		return false;
	}
});

Contracts.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
/* Before Insert Hook */

if (typeof doc.abi === 'string') {
	try {
		const abiObj = JSON.parse(doc.abi);
		doc.abi = abiObj;
		// console.log('Success: ', abiObj);
	} catch(e) {
		console.log(`Failed to parse ABI of ${doc.name}`);
	}
} else {
	console.log(`No String ABI provided for ${doc.name}`);
}

});

Contracts.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
/* Before Update Hook */

if (typeof modifier.$set.abi === 'string') {
	try {
		const abiObj = JSON.parse(modifier.$set.abi);
		modifier.$set.abi = abiObj;
		console.log('Success: ', abiObj);
	} catch(e) {
		console.log('Fail!', modifier.$set.abi);
	}
} 
});

Contracts.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Contracts.before.remove(function(userId, doc) {
	
});

Contracts.after.insert(function(userId, doc) {
	
});

Contracts.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Contracts.after.remove(function(userId, doc) {
	
});
