Meteor.methods({
	"chainsInsert": function(data) {
		if(!Chains.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Chains.insert(data);
	},

	"chainsUpdate": function(id, data) {
		var doc = Chains.findOne({ _id: id });
		if(!Chains.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Chains.update({ _id: id }, { $set: data });
	},

	"chainsRemove": function(id) {
		var doc = Chains.findOne({ _id: id });
		if(!Chains.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Chains.remove({ _id: id });
	}
});
