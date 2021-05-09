Meteor.methods({
	"claimsInsert": function(data) {
		if(!Claims.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Claims.insert(data);
	},

	"claimsUpdate": function(id, data) {
		var doc = Claims.findOne({ _id: id });
		if(!Claims.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Claims.update({ _id: id }, { $set: data });
	},

	"claimsRemove": function(id) {
		var doc = Claims.findOne({ _id: id });
		if(!Claims.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Claims.remove({ _id: id });
	}
});
