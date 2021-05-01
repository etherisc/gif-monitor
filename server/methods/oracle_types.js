Meteor.methods({
	"oracleTypesInsert": function(data) {
		if(!OracleTypes.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return OracleTypes.insert(data);
	},

	"oracleTypesUpdate": function(id, data) {
		var doc = OracleTypes.findOne({ _id: id });
		if(!OracleTypes.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		OracleTypes.update({ _id: id }, { $set: data });
	},

	"oracleTypesRemove": function(id) {
		var doc = OracleTypes.findOne({ _id: id });
		if(!OracleTypes.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		OracleTypes.remove({ _id: id });
	}
});
