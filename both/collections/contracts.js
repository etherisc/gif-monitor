this.Contracts = new Mongo.Collection("contracts");

this.Contracts.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin"]);
};

this.Contracts.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};

this.Contracts.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};
