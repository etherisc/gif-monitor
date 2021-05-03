this.Addresses = new Mongo.Collection("addresses");

this.Addresses.userCanInsert = function(userId, doc) {
	return true;
};

this.Addresses.userCanUpdate = function(userId, doc) {
	return true;
};

this.Addresses.userCanRemove = function(userId, doc) {
	return true;
};
