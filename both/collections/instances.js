this.Instances = new Mongo.Collection("instances");

this.Instances.userCanInsert = function(userId, doc) {
	return true;
};

this.Instances.userCanUpdate = function(userId, doc) {
	return true;
};

this.Instances.userCanRemove = function(userId, doc) {
	return true;
};
