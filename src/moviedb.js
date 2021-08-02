#!/usr/bin/env node
const { Command } = require("commander");
require("dotenv").config();
const request = require("./utils/requestsMethods");
const render = require("./utils/renderMethods");
const { spinner } = require("./utils/spinner");
const chalk = require("chalk");

const program = new Command();

program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .action(function handleAction() {
    console.log("hello-world");
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .action(function handleAction() {
    console.log("hello-world");
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .requiredOption("--page <number>", "The page of movies data results to fetch")
  .option("-p, --popular", "Fetch the popular movies")
  .option("-n, --now-playing", "Fetch the movies that are playing now")
  .action(async function handleAction(options) {
    spinner.start(
      `${chalk.bold(`${chalk.yellow("Fetching the movies data...")}`)}`
    );
    const page = parseInt(options.page);
    let moviesJson = {};
    let spinnerText = "";
    if (options.nowPlaying === true) {
      moviesJson = await request.getNowPlayingMovies(page);
      spinnerText = "Movies playing now data loaded";
    } else {
      moviesJson = await request.getPopularMovies(page);
      spinnerText = "Popular movies data loaded";
    }
    render.renderMovies(
      moviesJson.page,
      moviesJson.total_pages,
      moviesJson.results
    );
    spinner.succeed(spinnerText);
  })
  .catch(() => {
    throw "new Error";
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <number>", "The id of the movie")
  .option("-r, --reviews", "Fetch the reviews of the movie")
  .action(async function handleAction(options) {
    spinner.start(
      `${chalk.bold(`${chalk.yellow("Fetching the movie data...")}`)}`
    );
    const movieId = parseInt(options.id);
    const singleMovieJson = await request.getMovie(movieId);
    render.renderSingleMovie(singleMovieJson);
    if (options.reviews === true) {
      const movieId = parseInt(options.id);
      const movieReviewsJson = await request.getMovieReviews(movieId);
      render.renderReviews(movieReviewsJson);
      spinner.succeed("Movie reviews data loaded");
    } else {
      spinner.succeed("Movie data loaded");
    }
  });

//TODO error on unknown commands

program.parse(process.argv);
