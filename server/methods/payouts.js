Meteor.methods({
	"payoutsInsert": function(data) {
		if(!Payouts.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Payouts.insert(data);
	},

	"payoutsUpdate": function(id, data) {
		var doc = Payouts.findOne({ _id: id });
		if(!Payouts.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Payouts.update({ _id: id }, { $set: data });
	},

	"payoutsRemove": function(id) {
		var doc = Payouts.findOne({ _id: id });
		if(!Payouts.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Payouts.remove({ _id: id });
	}
});
