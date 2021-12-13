import https from "https";

function request(options) {
	return new Promise((resolve, reject) => {
		let data = "";

		const req = https.request(options, (res) => {
			res.on("data", function (chunk) {
				data += chunk;
			});

			res.on("end", function () {
				resolve(JSON.parse(data));
			});

			res.on("error", function (error) {
				reject(error);
			});
		});

		req.end();
	});
}

export default request;
