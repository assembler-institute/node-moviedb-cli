#!/usr/bin/env node
const { Command } = require("commander");
const chalk = require("chalk");
require("dotenv").config();
const request = require("./utils/requestsMethods");
const render = require("./utils/renderMethods");
const fileSystem = require("./utils/fileSystemMethods");
const { spinner } = require("./utils/spinner");
const { notify } = require("./utils/notifier");

const program = new Command();

program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )
  .option("-p, --popular", "Fetch the popular persons")
  .action(async function handleAction(options) {
    spinner.start(
      `${chalk.bold(
        `${chalk.yellow(" Fetching the popular person's data...")}`
      )}`
    );
    const page = parseInt(options.page);
    try {
      const json = await request.getPopularPersons(page);
      render.renderPersons(json);
      spinner.succeed("Popular Persons data loaded");
    } catch (error) {
      setTimeout(() => {
        spinner.fail(chalk.bold(chalk.red(error)));
      }, 1000);
    }
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <number> ", "The id of the person")
  .action(async function handleAction(options) {
    spinner.start(
      `${chalk.bold(`${chalk.yellow("Fetching the person's data...")}`)}`
    );
    const personId = parseInt(options.id);
    try {
      const json = await request.getPerson(personId);
      render.renderPersonDetails(json);
      spinner.succeed("Person data loaded");
    } catch (error) {
      setTimeout(() => {
        spinner.fail(chalk.bold(chalk.red(error)));
      }, 1000);
    }
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .requiredOption("--page <number>", "The page of movies data results to fetch")
  .option("-p, --popular", "Fetch the popular movies")
  .option("-n, --now-playing", "Fetch the movies that are playing now")
  .option("--save", "Save the movies to /files/movies")
  .option("--local", "Fetch the movies from /files/movies")
  .action(async function handleAction(options) {
    spinner.start(
      `${chalk.bold(`${chalk.yellow("Fetching the movies data...")}`)}`
    );
    const page = parseInt(options.page);
    let moviesJson = {};
    let spinnerText = "";
    try {
      if (options.local === true) {
        if (options.nowPlaying === true) {
          moviesJson = await fileSystem.loadMovies(options.nowPlaying);
          spinnerText = "Movies playing now data loaded";
        } else {
          moviesJson = await fileSystem.loadMovies(options.nowPlaying);
          spinnerText = "Popular movies data loaded";
        }
      } else {
        if (options.nowPlaying === true) {
          moviesJson = await request.getNowPlayingMovies(page);
          spinnerText = "Movies playing now data loaded";
        } else {
          moviesJson = await request.getPopularMovies(page);
          spinnerText = "Popular movies data loaded";
        }
      }
      if (options.save === true) {
        await fileSystem.saveMovies(moviesJson, options.nowPlaying);
        spinnerText += " and saved to file/movies";
        notify("Movies saved to file!");
      } else {
        render.renderMovies(
          moviesJson.page,
          moviesJson.total_pages,
          moviesJson.results
        );
      }
      spinner.succeed(spinnerText);
    } catch (error) {
      setTimeout(() => {
        spinner.fail(chalk.bold(chalk.red(error)));
      }, 1000);
    }
    render.renderMovies(
      moviesJson.page,
      moviesJson.total_pages,
      moviesJson.results
    );
    spinner.succeed(spinnerText);
  });
// .catch(() => {
//   throw "new Error";
// });

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
    try {
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
    } catch (error) {
      setTimeout(() => {
        spinner.fail(chalk.bold(chalk.red(error)));
      }, 1000);
    }
  });

//TODO error on unknown commands

program.parse(process.argv);
