Meteor.methods({
	"eventLastSeenInsert": function(data) {
		if(!EventLastSeen.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return EventLastSeen.insert(data);
	},

	"eventLastSeenUpdate": function(id, data) {
		var doc = EventLastSeen.findOne({ _id: id });
		if(!EventLastSeen.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		EventLastSeen.update({ _id: id }, { $set: data });
	},

	"eventLastSeenRemove": function(id) {
		var doc = EventLastSeen.findOne({ _id: id });
		if(!EventLastSeen.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		EventLastSeen.remove({ _id: id });
	}
});
