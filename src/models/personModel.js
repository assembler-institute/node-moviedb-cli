import request from "../utils/request.js";

async function getPerson(id) {
	const options = {
		method: "GET",
		hostname: process.env.API_BASE_URL,
		path: `/${process.env.API_VERSION}/person/${id}?api_key=${process.env.API_KEY}`,
		maxRedirects: 20,
	};

	return await request(options);
}

async function getPersons(page) {
	const options = {
		method: "GET",
		hostname: process.env.API_BASE_URL,
		path: `/${process.env.API_VERSION}/person/popular?page=${page}&api_key=${process.env.API_KEY}`,
		maxRedirects: 20,
	};

	return await request(options);
}

export { getPerson, getPersons };

// module.exports = {
// 	getPerson,
// 	getPersons,
// };
