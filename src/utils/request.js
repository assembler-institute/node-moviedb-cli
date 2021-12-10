import https from "https";

function request(options) {
	return new Promise((resolve, reject) => {
		const chunks = [];

		const req = https.request(options, (res) => {
			res.on("data", function (chunk) {
				chunks.push(chunk);
			});

			res.on("end", function (chunk) {
				var body = Buffer.concat(chunks);
				resolve(JSON.parse(body.toString()));
			});

			res.on("error", function (error) {
				reject(error);
			});
		});

		req.end();
	});
}

export default request;

// module.exports = {
// 	request,
// };
