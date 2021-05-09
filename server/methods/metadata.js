Meteor.methods({
	"metadataInsert": function(data) {
		if(!Metadata.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Metadata.insert(data);
	},

	"metadataUpdate": function(id, data) {
		var doc = Metadata.findOne({ _id: id });
		if(!Metadata.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Metadata.update({ _id: id }, { $set: data });
	},

	"metadataRemove": function(id) {
		var doc = Metadata.findOne({ _id: id });
		if(!Metadata.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Metadata.remove({ _id: id });
	}
});
