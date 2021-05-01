var apiGet = function(rootUrl, path, params, cb) {
	if(!rootUrl) {
		var msg = "API URL is empty.";
		var err = new Meteor.Error(400, msg);
		if(cb) {
			cb(err);
		} else {
			throw err;
		}
	}

	if(rootUrl[rootUrl.length - 1] != "/") {
		rootUrl += "/";
	}

	if(path && path[0] == "/") {
		path = path.substr(1);
	}

	var fullUrl = rootUrl + path;
	HTTP.get(fullUrl, { params: params }, function (e, r) {
		if(e) {
			if(cb) {
				cb(e);
			} else {
				console.error(e);
			}
		} else {
			if(cb) {
				cb(null, r ? r.data : null);
			}
		}
	});
};

var apiPost = function(rootUrl, path, data, cb) {
	if(!rootUrl) {
		var msg = "API URL is empty.";
		var err = new Meteor.Error(400, msg);
		if (cb) {
			cb(err);
		} else {
			throw err;
		}
	}

	if (rootUrl[rootUrl.length - 1] != "/") {
		rootUrl += "/";
	}

	if (path && path[0] == "/") {
		path = path.substr(1);
	}

	var fullUrl = rootUrl + path;
	HTTP.post(fullUrl, { headers: { "Content-Type": "application/json" }, data: data }, function (e, r) {
		if (e) {
			if (cb) {
				cb(e);
			} else {
				throw e;
			}
		} else {
			if (cb) {
				cb(null, r ? r.data : null);
			}
		}
	});
};


this.apiUtils = {
	apiGet: apiGet,
	apiPost: apiPost
};
