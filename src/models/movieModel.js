import request from "../utils/request.js";

async function getMovie(id) {
	const options = {
		method: "GET",
		hostname: process.env.API_BASE_URL,
		path: `/${process.env.API_VERSION}/movie/${id}?api_key=${process.env.API_KEY}`,
		maxRedirects: 20,
	};

	return await request(options);
}

async function getMovieReviews(id, page) {
	const options = {
		method: "GET",
		hostname: process.env.API_BASE_URL,
		path: `/${process.env.API_VERSION}/movie/${id}/reviews?page=${page}&api_key=${process.env.API_KEY}`,
		maxRedirects: 20,
	};

	return await request(options);
}

async function getPopularMovies(page) {
	const options = {
		method: "GET",
		hostname: process.env.API_BASE_URL,
		path: `/${process.env.API_VERSION}/movie/popular?page=${page}&api_key=${process.env.API_KEY}`,
		maxRedirects: 20,
	};

	return await request(options);
}

async function getPlayingMovies(page) {
	const options = {
		method: "GET",
		hostname: process.env.API_BASE_URL,
		path: `/${process.env.API_VERSION}/movie/now_playing?page=${page}&api_key=${process.env.API_KEY}`,
		maxRedirects: 20,
	};

	return await request(options);
}

export { getMovie, getMovieReviews, getPopularMovies, getPlayingMovies };
