Meteor.publish("event_list", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Events.find({}, {});
	}
	return Events.find({createdBy:this.userId}, {});
});

Meteor.publish("event", function(eventId) {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Events.find({_id:eventId}, {});
	}
	return Events.find({_id:eventId,createdBy:this.userId}, {});
});

Meteor.publish("event_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Events.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
	}
	return Events.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("event_list_paged_count", function(extraOptions) {
	Counts.publish(this, "event_list_paged_count", Events.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"eventListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","user"])) {
			var data = Events.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Events.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

