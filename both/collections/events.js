this.Events = new Mongo.Collection("events");

this.Events.userCanInsert = function(userId, doc) {
	return true;
};

this.Events.userCanUpdate = function(userId, doc) {
	return true;
};

this.Events.userCanRemove = function(userId, doc) {
	return true;
};
