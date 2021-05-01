Meteor.methods({
	"logsInsert": function(data) {
		if(!Logs.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Logs.insert(data);
	},

	"logsUpdate": function(id, data) {
		var doc = Logs.findOne({ _id: id });
		if(!Logs.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Logs.update({ _id: id }, { $set: data });
	},

	"logsRemove": function(id) {
		var doc = Logs.findOne({ _id: id });
		if(!Logs.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Logs.remove({ _id: id });
	}
});
