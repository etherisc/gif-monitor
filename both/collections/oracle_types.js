this.OracleTypes = new Mongo.Collection("oracle_types");

this.OracleTypes.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin"]);
};

this.OracleTypes.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};

this.OracleTypes.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};
