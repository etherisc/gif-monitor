this.Payouts = new Mongo.Collection("payouts");

this.Payouts.userCanInsert = function(userId, doc) {
	return true;
};

this.Payouts.userCanUpdate = function(userId, doc) {
	return true;
};

this.Payouts.userCanRemove = function(userId, doc) {
	return true;
};
