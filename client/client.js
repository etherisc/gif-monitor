this.App = {};
this.Helpers = {};

this.globalOnRendered = function() {
	
};

Meteor.startup(function() {
	
});

App.logout = function() {
	Meteor.logout(function(err) {
	});
};

Helpers.menuItemClass = function(routeName, params) {
	return menuItemClass(routeName, params);
};

Helpers.isPrivateZone = function() {
	return getCurrentZone() == "private";
};

Helpers.isPublicZone = function() {
	return getCurrentZone() == "public";
};

Helpers.isFreeZone = function() {
	return getCurrentZone() == "free";
};

Helpers.userFullName = function() {
	var user = Meteor.user();
	if(!user || !user.profile) {
		return "";
	}

	if(user.profile.firstName || user.profile.lastName) {
		return (user.profile.firstName || "") + (user.profile.lastName ? (" " + (user.profile.lastName || "")) : "");
	}

	return user.profile.name || "";
};

Helpers.userEmail = function() {
	var user = Meteor.user();
	if(!user) {
		return "";
	}

	if(user.emails && user.emails.length) {
		return user.emails[0].address || "";
	}

	if(user.private && user.private.email) {
		return user.private.email;
	}

	return "";
};

Helpers.userIsAdmin = function() {
	var user = Meteor.user();
	if(!user || !user.roles) {
		return false;
	}
	return user.roles.indexOf("admin") >= 0;
};

Helpers.randomString = function(strLen) {
	return Random.id(strLen);
};

Helpers.secondsToTime = function(seconds, timeFormat) {
	return secondsToTime(seconds, timeFormat);
};

Helpers.integerDayOfWeekToString = function(day) {
	if(_.isArray(day)) {
		var s = "";
		_.each(day, function(d, i) {
			if(i > 0) {
				s = s + ", ";
			}
			s = s + ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][d];
		});
		return s;
	}
	return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][day];
};

Helpers.formatDate = function(date, dateFormat) {
	if(!date) {
		return "";
	}

	var f = dateFormat || "MM/DD/YYYY";

	if(_.isString(date)) {
		if(date.toUpperCase() == "NOW") {
			date = new Date();
		}
		if(date.toUpperCase() == "TODAY") {
			var d = new Date();
			date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
		}
	}

	return moment(date).format(f);
};

Helpers.booleanToYesNo = function(b) {
	return b ? "Yes" : "No";
};

Helpers.integerToYesNo = function(i) {
	return i ? "Yes" : "No";
};

Helpers.integerToTrueFalse = function(i) {
	return i ? "True" : "False";
};

// Tries to convert argument to array
//   array is returned unchanged
//   string "a,b,c" or "a, b, c" will be returned as ["a", "b", "c"]
//   for other types, array with one element (argument) is returned
//   TODO: implement other types to array conversion
Helpers.getArray = function(a) {
	a = a || [];
	if(_.isArray(a)) return a;
	if(_.isString(a)) {
		var array = a.split(",") || [];
		_.each(array, function(item, i) { array[i] = item.trim(); });
		return array;
	}

	/* object... what to return? keys or values?
	if(_.isObject(a)) {
	}
	*/

	var array = [];
	array.push(a);
	return array;
};

Helpers.cursorEmpty = function(cursor) {
	return cursor && cursor.count();
};

_.each(Helpers, function (helper, key) {
	Handlebars.registerHelper(key, helper);
});
