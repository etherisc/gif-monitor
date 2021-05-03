Meteor.publish("product_list", function() {
	return Products.find({}, {});
});

Meteor.publish("product", function(productId) {
	return Products.find({_id:productId}, {});
});

Meteor.publish("product_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Products.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("product_list_paged_count", function(extraOptions) {
	Counts.publish(this, "product_list_paged_count", Products.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"productListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Products.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

