this.Transactions = new Mongo.Collection("transactions");

this.Transactions.userCanInsert = function(userId, doc) {
	return true;
};

this.Transactions.userCanUpdate = function(userId, doc) {
	return true;
};

this.Transactions.userCanRemove = function(userId, doc) {
	return true;
};
