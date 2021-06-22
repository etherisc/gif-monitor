Meteor.methods({
	"instancesInsert": function(data) {
		if(!Instances.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Instances.insert(data);
	},

	"instancesUpdate": function(id, data) {
		var doc = Instances.findOne({ _id: id });
		if(!Instances.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Instances.update({ _id: id }, { $set: data });
	},

	"instancesRemove": function(id) {
		var doc = Instances.findOne({ _id: id });
		if(!Instances.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Instances.remove({ _id: id });
	}
});
