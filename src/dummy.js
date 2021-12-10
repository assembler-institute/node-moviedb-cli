var https = require("https");
var fs = require("fs");

var options = {
	method: "GET",
	hostname: "api.themoviedb.org",
	path: "/3/person/popular?page=1&api_key=bf6096fe8a74b78fb23e8caade7415cb",
	headers: {},
	maxRedirects: 20,
};

var req = https.request(options, function (res) {
	var chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function (chunk) {
		var body = Buffer.concat(chunks);
		console.log(body.toString());
	});

	res.on("error", function (error) {
		console.error(error);
	});
});

req.end();
