this.Transactions = new Mongo.Collection("transactions");

this.Transactions.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin"]);
};

this.Transactions.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};

this.Transactions.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};
