Meteor.publish("product_list", function() {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Products.find({}, {});
	}
	return Products.find({createdBy:this.userId}, {});
});

Meteor.publish("product", function(productId) {
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Products.find({_id:productId}, {});
	}
	return Products.find({_id:productId,createdBy:this.userId}, {});
});

Meteor.publish("product_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","user"])) {
		return Products.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
	}
	return Products.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("product_list_paged_count", function(extraOptions) {
	Counts.publish(this, "product_list_paged_count", Products.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"productListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","user"])) {
			var data = Products.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Products.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

