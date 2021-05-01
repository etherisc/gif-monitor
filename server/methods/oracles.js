Meteor.methods({
	"oraclesInsert": function(data) {
		if(!Oracles.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Oracles.insert(data);
	},

	"oraclesUpdate": function(id, data) {
		var doc = Oracles.findOne({ _id: id });
		if(!Oracles.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Oracles.update({ _id: id }, { $set: data });
	},

	"oraclesRemove": function(id) {
		var doc = Oracles.findOne({ _id: id });
		if(!Oracles.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Oracles.remove({ _id: id });
	}
});
