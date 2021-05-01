Meteor.methods({
	"addressesInsert": function(data) {
		if(!Addresses.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Addresses.insert(data);
	},

	"addressesUpdate": function(id, data) {
		var doc = Addresses.findOne({ _id: id });
		if(!Addresses.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Addresses.update({ _id: id }, { $set: data });
	},

	"addressesRemove": function(id) {
		var doc = Addresses.findOne({ _id: id });
		if(!Addresses.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Addresses.remove({ _id: id });
	}
});
