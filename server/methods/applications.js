Meteor.methods({
	"applicationsInsert": function(data) {
		if(!Applications.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Applications.insert(data);
	},

	"applicationsUpdate": function(id, data) {
		var doc = Applications.findOne({ _id: id });
		if(!Applications.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Applications.update({ _id: id }, { $set: data });
	},

	"applicationsRemove": function(id) {
		var doc = Applications.findOne({ _id: id });
		if(!Applications.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Applications.remove({ _id: id });
	}
});
