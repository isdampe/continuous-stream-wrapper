#!/usr/bin/env node
const Cam = require('onvif').Cam;

Date.prototype.stdTimezoneOffset = function () {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.isDstObserved = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}

if (process.argv.length < 3) {
	console.log("Usage: onvif-set-time.js [ip-address]");
	process.exit(0);
}


new Cam({
	hostname: process.argv[process.argv.length -1],
	username: "admin",
	password: "",
	port: 8899
}, function(err) {
	if (err)
		throw new Error(err);

	const date = new Date();

	this.setSystemDateAndTime({
		dateTime: date,
		dateTimeType: "Manual",
		daylightSavings: date.isDstObserved()
	}, function(err, results, xml) {
		if (err)
			throw new Error(err);

		console.log("The time was set to " + results);
	});

});
