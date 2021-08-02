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
  .action(function handleAction() {
    console.log("hello-world");
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
  .action(function handleAction() {
    console.log(process.env.API_KEY);
  });

// error on unknown commands

program.parse(process.argv);
