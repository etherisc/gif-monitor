this.EventLastSeen = new Mongo.Collection("event_last_seen");

this.EventLastSeen.userCanInsert = function(userId, doc) {
	return true;
};

this.EventLastSeen.userCanUpdate = function(userId, doc) {
	return true;
};

this.EventLastSeen.userCanRemove = function(userId, doc) {
	return true;
};
