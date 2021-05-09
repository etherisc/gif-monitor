Meteor.methods({
	"policiesInsert": function(data) {
		if(!Policies.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Policies.insert(data);
	},

	"policiesUpdate": function(id, data) {
		var doc = Policies.findOne({ _id: id });
		if(!Policies.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Policies.update({ _id: id }, { $set: data });
	},

	"policiesRemove": function(id) {
		var doc = Policies.findOne({ _id: id });
		if(!Policies.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Policies.remove({ _id: id });
	}
});
