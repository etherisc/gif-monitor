this.Instances = new Mongo.Collection("instances");

this.Instances.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","blocked"]);
};

this.Instances.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","blocked"]));
};

this.Instances.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","blocked"]));
};
