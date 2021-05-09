this.Applications = new Mongo.Collection("applications");

this.Applications.userCanInsert = function(userId, doc) {
	return true;
};

this.Applications.userCanUpdate = function(userId, doc) {
	return true;
};

this.Applications.userCanRemove = function(userId, doc) {
	return true;
};
