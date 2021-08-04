#!/usr/bin/env node

const { Command } = require("commander");

// Get persons command functions
const {
  getPersonsRequest,
  readLocalGetPersonsData,
} = require("./module/get_persons");

// Get person command functions
const {
  getPersonRequest,
  readLocalGetPersonData,
} = require("./module/get_person");

// Get movies command functions
const {
  getMoviesRequest,
  getMoviesNowPlayingRequest,
  readLocalGetMoviesData,
} = require("./module/get_movies");

// Get movie command functions
const {
  getMovieRequest,
  getMovieReviewsRequest,
  readLocalGetMovieData,
} = require("./module/get_movie");

const program = new Command();
program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .action((options) => {
    if (options.local) {
      readLocalGetPersonsData();
    } else {
      getPersonsRequest(options);
    }
  })
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )
  .option("--save", "Save the data in a local file")
  .option("--local", "Read the data from the local file");

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .action((options) => {
    if (options.local) {
      readLocalGetPersonData();
    } else {
      getPersonRequest(options);
    }
  })
  .requiredOption("-i, --id <number>", "The id of the person")
  .option("--save", "Save the data in a local file")
  .option("--local", "Read the data from the local file");

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .action((options) => {
    if (options.local) {
      if (options.nowPlaying) {
        readLocalGetMoviesData(true);
      } else {
        readLocalGetMoviesData();
      }
    } else {
      if (options.nowPlaying) {
        getMoviesNowPlayingRequest(options);
      } else {
        getMoviesRequest(options);
      }
    }
  })
  .requiredOption("--page <number>", "The page of movies data results to fetch")
  .option("-p, --popular", "Fetch the popular movies")
  .option("-n, --now-playing", "Fetch the movies that are playing now")
  .option("--save", "Save the data in a local file")
  .option("--local", "Read the data from the local file");

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .action((options) => {
    if (options.local) {
      if (options.reviews) {
        readLocalGetMovieData(true);
      } else {
        readLocalGetMovieData();
      }
    } else {
      if (options.reviews) {
        getMovieReviewsRequest(options);
      } else {
        getMovieRequest(options);
      }
    }
  })
  .requiredOption("-i, --id <number>", "The id of the movie")
  .option("-r, --reviews", "Fetch the reviews of the movie")
  .option("--save", "Save the data in a local file")
  .option("--local", "Read the data from the local file");

// error on unknown commands

program.parse(process.argv);
