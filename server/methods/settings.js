Meteor.methods({
	"settingsInsert": function(data) {
		if(!Settings.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Settings.insert(data);
	},

	"settingsUpdate": function(id, data) {
		var doc = Settings.findOne({ _id: id });
		if(!Settings.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Settings.update({ _id: id }, { $set: data });
	},

	"settingsRemove": function(id) {
		var doc = Settings.findOne({ _id: id });
		if(!Settings.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Settings.remove({ _id: id });
	}
});
