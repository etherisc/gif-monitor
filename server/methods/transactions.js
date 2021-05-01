Meteor.methods({
	"transactionsInsert": function(data) {
		if(!Transactions.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Transactions.insert(data);
	},

	"transactionsUpdate": function(id, data) {
		var doc = Transactions.findOne({ _id: id });
		if(!Transactions.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Transactions.update({ _id: id }, { $set: data });
	},

	"transactionsRemove": function(id) {
		var doc = Transactions.findOne({ _id: id });
		if(!Transactions.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Transactions.remove({ _id: id });
	}
});
