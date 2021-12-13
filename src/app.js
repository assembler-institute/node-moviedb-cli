import { config } from "dotenv";

config();

import { Command } from "commander";
import { default as ora } from "ora";
import { getPerson, getPersons } from "./models/personModel.js";
import { getMovie, getMovieReviews, getPlayingMovies, getPopularMovies } from "./models/movieModel.js";
import { showPerson, showPersons } from "./views/personView.js";
import { showMovie, showMovies } from "./views/movieView.js";
import { optionParseInteger } from "./utils/option.js";

const program = new Command();

program.version("0.0.1", "-v, --version", "Display the current version");

program
	.command("get-person")
	.description("Make a network request to fetch most popular persons")
	.requiredOption("-i, --id <number>", "The id of the person", optionParseInteger)
	.action(async (options) => {
		const { id } = options;
		const loader = ora({
			text: "Fetching person details...",
			spinner: "dots",
		});

		try {
			loader.start();

			const data = await getPerson(id);

			if (data.status_message) throw new Error(data.status_message);

			showPerson(data);

			loader.succeed("Person details loaded successfully");
		} catch (error) {
			loader.fail(error.message);
		}
	});

program
	.command("get-persons")
	.description("Make a network request to fetch most popular persons")
	.requiredOption("-p, --popular", "Fetch the popular persons")
	.requiredOption("--page <number>", "The page of persons data results to fetch", optionParseInteger)
	.action(async (options) => {
		const { page } = options;
		const loader = ora({
			text: "Fetching popular persons' data...",
			spinner: "dots",
		});

		try {
			loader.start();

			const data = await getPersons(page);

			if (data.status_message) throw new Error(data.status_message);

			showPersons(data);

			loader.succeed("Popular persons' data loaded successfully");
		} catch (error) {
			loader.fail(error.message);
		}
	});

program
	.command("get-movies")
	.description("Make a network request to fetch movies")
	.requiredOption("--page <number>", "The page of movies data results to fetch", optionParseInteger)
	.option("-p, --popular", "Fetch the popular movies")
	.option("-n, --now-playing", "Fetch the movies that are playing now")
	.action(async (options) => {
		const { page, nowPlaying } = options;
		const loader = ora({
			text: "Fetching the movies data...",
			spinner: "dots",
		});

		try {
			loader.start();

			const data = nowPlaying ? await getPlayingMovies(page) : await getPopularMovies(page);

			if (data.status_message) throw new Error(data.status_message);

			showMovies(data);

			loader.succeed(
				nowPlaying ? " Movies playing now data loaded successfully" : "Popular movies data loaded successfully"
			);
		} catch (error) {
			loader.fail(error.message);
		}
	});

program
	.command("get-movie")
	.description("Make a network request to fetch movie details")
	.requiredOption("-i, --id <number>", "The id of the person", optionParseInteger)
	.option("--page <number>", "Fetch the movie reviews", optionParseInteger, 1)
	.option("--reviews", "Fetch the movie reviews")
	.action(async (options) => {
		const { id, reviews, page } = options;
		const loader = ora({
			text: "Fetching the movie data...",
			spinner: "dots",
		});

		try {
			loader.start();

			if (reviews) {
				const data = await getMovieReviews(id, page);

				if (data.status_message) throw new Error(data.status_message);

				console.log(data);

				loader.succeed("Movie reviews loaded successfully");
			} else {
				const data = await getMovie(id);

				if (data.status_message) throw new Error(data.status_message);

				showMovie(data);

				loader.succeed("Movie details loaded successfully");
			}
		} catch (error) {
			loader.fail(error.message);
		}
	});

program.parse(process.argv);
