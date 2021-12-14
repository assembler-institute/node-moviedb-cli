#!/usr/bin/env node

const { Command } = require("commander");
const myParseInt = require("./utils/parseInt.js");
const getPersons = require("./utils/getPersonsSpinner.js");
const getPerson = require("./utils/getPersonSpinner.js");
const getMovies = require("./utils/getMoviesSpinner.js");
const getMovie = require("./utils/getMovieSpinner.js");

const program = new Command();
program.version("0.0.1");

// Commands

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch",
    myParseInt
  )
  .option("-s --save", "Save the fetched data into a JSON file")
  .option("-l --local", "Read the data from your local JSON file")
  .action((options) => {
    if (options.page) getPersons(options.page, options.save, options.local);
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <number>", "The id of the person", myParseInt)
  .action((options) => {
    if (options.id) getPerson(options.id);
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .option("-p, --popular", "Fetch the most popular movies")
  .option("-n, --now-playing", "Fetch the movies that are being played now")
  .option("-s --save", "Save the fetched data into a JSON file")
  .option("-l --local", "Read the data from your local JSON file")
  .requiredOption(
    "--page <number>",
    "The page of movies data results to fetch",
    myParseInt
  )
  .action((options) => {
    getMovies(options.page, options.nowPlaying, options.save, options.local);
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <number>", "The id of the movie", myParseInt)
  .option("-r, --reviews", "Fetch the reviews of the movie")
  .action((options) => {
    getMovie(options.id, options.reviews);
  });

// Options

// error on unknown commands

program.parse(process.argv);
