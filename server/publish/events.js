Meteor.publish("event_list", function() {
	return Events.find({}, {});
});

Meteor.publish("event", function(eventId) {
	return Events.find({_id:eventId}, {});
});

Meteor.publish("event_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Events.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("event_list_paged_count", function(extraOptions) {
	Counts.publish(this, "event_list_paged_count", Events.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"eventListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Events.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

