this.Products = new Mongo.Collection("products");

this.Products.userCanInsert = function(userId, doc) {
	return true;
};

this.Products.userCanUpdate = function(userId, doc) {
	return true;
};

this.Products.userCanRemove = function(userId, doc) {
	return true;
};
