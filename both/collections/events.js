this.Events = new Mongo.Collection("events");

this.Events.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin"]);
};

this.Events.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};

this.Events.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};
