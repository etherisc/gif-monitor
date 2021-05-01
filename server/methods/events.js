Meteor.methods({
	"eventsInsert": function(data) {
		if(!Events.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Events.insert(data);
	},

	"eventsUpdate": function(id, data) {
		var doc = Events.findOne({ _id: id });
		if(!Events.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Events.update({ _id: id }, { $set: data });
	},

	"eventsRemove": function(id) {
		var doc = Events.findOne({ _id: id });
		if(!Events.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Events.remove({ _id: id });
	}
});
