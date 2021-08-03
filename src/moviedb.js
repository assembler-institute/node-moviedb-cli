#!/usr/bin/env node

const { Command } = require("commander");
const req = require("./utils/httprequest");
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
  .requiredOption("-i, --id <personId>", "The id of the person")
  .action(function handleAction(options) {
    req.httpRequest(`person/${options.id}`);
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .requiredOption(
    "--page <pageNum>",
    "The page of movies data results to fetch"
  )
  .option("-p, --popular", "Fetch the popular movies")
  .option("-n, --now-playing", "Fetch the movies that are playing now")
  .action(function handleAction(options) {
    const endPoint = options.nowPlaying ? "movie/now_playing" : "movie/popular";
    req.httpRequest(endPoint, `page=${options.page}`);
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
