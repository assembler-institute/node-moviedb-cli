#!/usr/bin/env node

const { Command } = require("commander");
require("dotenv").config();
const request = require("./utils/requestsMethods");
// console.log(process.env.API_KEY);

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
    //default popular movies
    // const options = program.opts();
    const page = options.page;
    if (options.nowPlaying === true) {
    } else if (options.popular === true) {
      const json = await request.getPopularMovies(page);
      console.log(json);
      // console.log("now-playing");
    } else {
    }
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .action(function handleAction() {
    console.log("hello-world");
  });

// error on unknown commands

program.parse(process.argv);
