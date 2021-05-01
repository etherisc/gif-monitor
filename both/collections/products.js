this.Products = new Mongo.Collection("products");

this.Products.userCanInsert = function(userId, doc) {
	return false;
};

this.Products.userCanUpdate = function(userId, doc) {
	return false;
};

this.Products.userCanRemove = function(userId, doc) {
	return false;
};
