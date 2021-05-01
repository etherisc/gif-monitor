this.formatDate = function(date, dateFormat) {
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

this.strToDate = function(str, dateFormat) {
	var f = dateFormat || "MM/DD/YYYY";

	return moment(str, dateFormat);
}

this.timeToSeconds = function(timeStr, timeFormat) {
	var t = timeStr || "12:00 am";
	var tf = timeFormat || "h:mm a";
	var m = moment.utc("01/01/1970 " + t, "MM/DD/YYYY " + tf);
	if(!m.isValid()) {
		return null;
	}
	return m.unix();
};

this.secondsToTime = function(seconds, timeFormat) {
	var s = seconds || 0;
	var tf = timeFormat || "h:mm a";

	if(String(s).toUpperCase() == "NOW") {
		return moment(new Date()).format(tf);
	}

	return moment.unix(s).utc().format(tf);
};

this.dateUtils = {
	formatDate: formatDate,
	strToDate: strToDate,
	timeToSeconds: timeToSeconds,
	secondsToTime: secondsToTime
};
