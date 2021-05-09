this.Policies = new Mongo.Collection("policies");

this.Policies.userCanInsert = function(userId, doc) {
	return true;
};

this.Policies.userCanUpdate = function(userId, doc) {
	return true;
};

this.Policies.userCanRemove = function(userId, doc) {
	return true;
};
