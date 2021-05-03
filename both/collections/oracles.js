this.Oracles = new Mongo.Collection("oracles");

this.Oracles.userCanInsert = function(userId, doc) {
	return true;
};

this.Oracles.userCanUpdate = function(userId, doc) {
	return true;
};

this.Oracles.userCanRemove = function(userId, doc) {
	return true;
};
