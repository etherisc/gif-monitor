this.Logs = new Mongo.Collection("logs");

this.Logs.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin"]);
};

this.Logs.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};

this.Logs.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};
