this.Chains = new Mongo.Collection("chains");

this.Chains.userCanInsert = function(userId, doc) {
	return true;
};

this.Chains.userCanUpdate = function(userId, doc) {
	return true;
};

this.Chains.userCanRemove = function(userId, doc) {
	return true;
};
