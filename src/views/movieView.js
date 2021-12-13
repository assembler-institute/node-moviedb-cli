import chalk from "chalk";

function showMovies(data) {
	const movies = data.results || [];

	console.log();

	movies.forEach((movie) => {
		const { id, title, release_date } = movie;

		console.log(chalk.white("----------------------------------------\n"));
		console.log(chalk.white("Movie:\n"));
		console.log(`ID: ${chalk.white(id)}`);
		console.log(`Title: ${chalk.blue.bold(title)}`);
		console.log(`Release date: ${chalk.white(release_date)}`);
		console.log();
	});
}

function showMovie(data) {
	const { id, title, release_date, runtime, vote_count, overview, genres, spoken_languages } = data;

	console.log();

	console.log(chalk.white("----------------------------------------\n"));
	console.log(chalk.white("Movie:\n"));
	console.log(`ID: ${chalk.white(id)}`);
	console.log(`Title: ${chalk.blue.bold(title)}`);
	console.log(`Release date: ${chalk.white(release_date)}`);
	console.log(`Runtime ${chalk.white(runtime)}`);
	console.log(`Vote count: ${chalk.white(vote_count)}`);
	console.log(`Overview: ${chalk.white(overview)}`);
	console.log();

	if (genres.length) {
		console.log("Genres:\n");

		genres.forEach((genre) => {
			console.log(chalk.white(genre.name));
		});
	} else {
		console.log(chalk.yellow("The movie doesn’t have a declared genre"));
	}

	console.log();

	if (spoken_languages.length) {
		console.log("Languages:\n");

		spoken_languages.forEach((spoken_language) => {
			console.log(chalk.white(spoken_language.name));
		});
	} else {
		console.log(chalk.yellow("The movie doesn’t have a declared language"));
	}

	console.log();
}

function showMovieReviews(data) {
	const { page, total_pages, results: reviews } = data;

	console.log();

	if (reviews.length) {
		console.log(chalk.white("----------------------------------------"));
		console.log(chalk.white(`Page ${page}/${total_pages}`));

		reviews.forEach((review) => {
			const { author, content } = review;
			const reviewText = content.length < 400 ? content : content.slice(0, 400) + "...";

			console.log(chalk.white("----------------------------------------\n"));
			console.log(`Author: ${chalk.blue.bold(author)}`);
			console.log(`Content: ${chalk.white(reviewText)}`);
			console.log();
		});
	} else {
		console.log(chalk.yellow("The movie doesn’t have any reviews"));
	}
}

export { showMovie, showMovies, showMovieReviews };
