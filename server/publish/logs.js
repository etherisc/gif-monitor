Meteor.publish("logline_list", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Logs.find({}, {});
	}
	return Logs.find({createdBy:this.userId}, {});
});

Meteor.publish("logline", function(loglineId) {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Logs.find({_id:loglineId}, {});
	}
	return Logs.find({_id:loglineId,createdBy:this.userId}, {});
});

Meteor.publish("logline_list_analytics", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Logs.find({source:"analytics"}, {sort:{timestamp:-1}});
	}
	return Logs.find({source:"analytics",createdBy:this.userId}, {sort:{timestamp:-1}});
});

Meteor.publish("logline_list_server", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Logs.find({source:"server"}, {sort:{timestamp:-1}});
	}
	return Logs.find({source:"server",createdBy:this.userId}, {sort:{timestamp:-1}});
});

Meteor.publish("logline_list_browser", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Logs.find({source:"browser"}, {sort:{timestamp:-1}});
	}
	return Logs.find({source:"browser",createdBy:this.userId}, {sort:{timestamp:-1}});
});

Meteor.publish("logline_list_browser_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Logs.find(databaseUtils.extendFilter({source:"browser"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
	}
	return Logs.find(databaseUtils.extendFilter({source:"browser",createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
});

Meteor.publish("logline_list_browser_paged_count", function(extraOptions) {
	Counts.publish(this, "logline_list_browser_paged_count", Logs.find(databaseUtils.extendFilter({source:"browser",createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"loglineListBrowserPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","user"])) {
			var data = Logs.find(databaseUtils.extendFilter({source:"browser"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Logs.find(databaseUtils.extendFilter({source:"browser",createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("logline_list_analytics_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Logs.find(databaseUtils.extendFilter({source:"analytics"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
	}
	return Logs.find(databaseUtils.extendFilter({source:"analytics",createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
});

Meteor.publish("logline_list_analytics_paged_count", function(extraOptions) {
	Counts.publish(this, "logline_list_analytics_paged_count", Logs.find(databaseUtils.extendFilter({source:"analytics",createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"loglineListAnalyticsPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","user"])) {
			var data = Logs.find(databaseUtils.extendFilter({source:"analytics"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Logs.find(databaseUtils.extendFilter({source:"analytics",createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("logline_list_server_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Logs.find(databaseUtils.extendFilter({source:"server"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
	}
	return Logs.find(databaseUtils.extendFilter({source:"server",createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
});

Meteor.publish("logline_list_server_paged_count", function(extraOptions) {
	Counts.publish(this, "logline_list_server_paged_count", Logs.find(databaseUtils.extendFilter({source:"server",createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"loglineListServerPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","user"])) {
			var data = Logs.find(databaseUtils.extendFilter({source:"server"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Logs.find(databaseUtils.extendFilter({source:"server",createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

