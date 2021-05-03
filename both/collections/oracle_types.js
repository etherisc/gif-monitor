this.OracleTypes = new Mongo.Collection("oracle_types");

this.OracleTypes.userCanInsert = function(userId, doc) {
	return true;
};

this.OracleTypes.userCanUpdate = function(userId, doc) {
	return true;
};

this.OracleTypes.userCanRemove = function(userId, doc) {
	return true;
};
