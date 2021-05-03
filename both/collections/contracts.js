this.Contracts = new Mongo.Collection("contracts");

this.Contracts.userCanInsert = function(userId, doc) {
	return true;
};

this.Contracts.userCanUpdate = function(userId, doc) {
	return true;
};

this.Contracts.userCanRemove = function(userId, doc) {
	return true;
};
