#!/usr/bin/env node

const { Command } = require("commander");
const req = require("./utils/httprequest");
const date = require("./utils/httprequest");
require("dotenv/config");

const program = new Command();
program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <pageNum>",
    "The page of persons data results to fetch"
  )
  .action(function handleAction(options) {
    req.httpRequest("person/popular", `page=${options.page}`);
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .action(function handleAction() {
    // console.log("hello-world");
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .action(function handleAction() {
    // console.log("hello-world");
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <id> ", "The id of the movie")
  .option("-r, --review", "Fetch the reviews of the movie")

  .action(function handleAction(options) {
    let movieId = options.id;
    let movieReview = options.review;
    if (movieReview) {
      req.httpRequest("movie/" + movieId + "/reviews");
    } else {
      req.httpRequest("movie/" + movieId);
    }
  });

// error on unknown commands

program.parse(process.argv);
