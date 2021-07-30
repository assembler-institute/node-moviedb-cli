#!/usr/bin/env node

const { Command } = require("commander");
require("dotenv").config();
const request = require("./utils/requestsMethods");

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
    const page = parseInt(options.page);
    if (options.nowPlaying === true) {
      const json = await request.getNowPlayingMovies(page);
      console.log(json);
    } else {
      const json = await request.getPopularMovies(page);
      console.log(json);
    }
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <number>", "The id of the movie")
  .option("-r, --reviews", "Fetch the reviews of the movie")
  .action(async function handleAction(options) {
    const movieId = parseInt(options.id);
    const json = await request.getMovie(movieId);
    console.log(json);
    if (options.reviews === true) {
      const movieId = parseInt(options.id);
      const json = await request.getMovieReviews(movieId);
      console.log(json);
    }
  });

// error on unknown commands

program.parse(process.argv);
