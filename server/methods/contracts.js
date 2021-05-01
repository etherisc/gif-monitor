Meteor.methods({
	"contractsInsert": function(data) {
		if(!Contracts.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Contracts.insert(data);
	},

	"contractsUpdate": function(id, data) {
		var doc = Contracts.findOne({ _id: id });
		if(!Contracts.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Contracts.update({ _id: id }, { $set: data });
	},

	"contractsRemove": function(id) {
		var doc = Contracts.findOne({ _id: id });
		if(!Contracts.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Contracts.remove({ _id: id });
	}
});
