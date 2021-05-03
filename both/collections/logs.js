this.Logs = new Mongo.Collection("logs");

this.Logs.userCanInsert = function(userId, doc) {
	return true;
};

this.Logs.userCanUpdate = function(userId, doc) {
	return true;
};

this.Logs.userCanRemove = function(userId, doc) {
	return true;
};
