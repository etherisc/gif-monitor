this.extendFilter = function(originalFilter, extraOptions) {
	originalFilter = originalFilter || {};
	extraOptions = extraOptions || {};

	var searchText = extraOptions.searchText || "";
	var searchFields = extraOptions.searchFields || [];

	var addFilter = {};

	// search
	if(searchText && searchFields && searchFields.length) {
		var searchList = [];
		var searchRegExp = new RegExp(searchText, "i");
		searchFields.map(function(fieldName) {
			var searchItem = {};
			searchItem[fieldName] = searchRegExp;
			searchList.push(searchItem);
		});
		addFilter["$or"] = searchList;
	}

	var filter = originalFilter;
	if(!_.isEmpty(addFilter) && !_.isEmpty(originalFilter)) {
		filter = { "$and": [ originalFilter, addFilter ] };
	} else {
		if(!_.isEmpty(addFilter)) {
			filter = addFilter;
		} else {
			filter = originalFilter;
		}
	}

	return filter;
};

this.extendOptions = function(originalOptions, extraOptions) {
	originalOptions = originalOptions || {};
	extraOptions = extraOptions || {};

	var sortBy = extraOptions.sortBy || "";
	var pageNo = typeof extraOptions.pageNo == "undefined" ? -1 : extraOptions.pageNo;
	var pageSize = extraOptions.pageSize || 0;
	var doSkip = extraOptions.doSkip || false;

	var addOptions = {};

	// sort
	if(sortBy) {
		addOptions.sort = {};
		addOptions.sort[sortBy] = (typeof extraOptions.sortAscending == "undefined" || extraOptions.sortAscending) ? 1 : -1;
	}

	// skip & limit
	if(!extraOptions.noPaging && pageNo >= 0 && pageSize > 0) {
		if(doSkip) {
			addOptions.skip = pageNo * pageSize;
		}
		addOptions.limit = pageSize;
	}

	var options = originalOptions;

	if(!_.isEmpty(addOptions)) {
		objectUtils.mergeObjects(options, addOptions);
	}

	return options;
};

this.databaseUtils = {
	extendFilter: extendFilter,
	extendOptions: extendOptions
};
