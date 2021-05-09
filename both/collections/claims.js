this.Claims = new Mongo.Collection("claims");

this.Claims.userCanInsert = function(userId, doc) {
	return true;
};

this.Claims.userCanUpdate = function(userId, doc) {
	return true;
};

this.Claims.userCanRemove = function(userId, doc) {
	return true;
};
