#!/usr/bin/env node

const { Command, option } = require("commander");
const { getPersons } = require("./module/getPersonsRequest");
const { getMovies, getMoviesNowPlaying } = require("./module/getMoviesRequest");
const program = new Command();
program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .action((options) => {
    getPersons(options);
  })
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  );

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .action(function handleAction() {
    console.log("hello-world");
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")

  .action((options) => {
    if (options.nowPlaying) {
      getMoviesNowPlaying(options);
    } else {
      getMovies(options);
    }
  })
  .requiredOption("--page <number>", "The page of movies data results to fetch")
  .option("-p, --popular", "Fetch the popular movies")
  .option("-n, --now-playing", "Fetch the movies that are playing now");

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .action(function handleAction() {
    console.log("hello-world");
  });

// error on unknown commands

program.parse(process.argv);
