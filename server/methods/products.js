Meteor.methods({
	"productsInsert": function(data) {
		if(!Products.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Products.insert(data);
	},

	"productsUpdate": function(id, data) {
		var doc = Products.findOne({ _id: id });
		if(!Products.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Products.update({ _id: id }, { $set: data });
	},

	"productsRemove": function(id) {
		var doc = Products.findOne({ _id: id });
		if(!Products.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Products.remove({ _id: id });
	}
});
