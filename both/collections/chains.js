this.Chains = new Mongo.Collection("chains");

this.Chains.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin"]);
};

this.Chains.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};

this.Chains.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};
