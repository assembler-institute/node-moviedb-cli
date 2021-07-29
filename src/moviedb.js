#!/usr/bin/env node

const { Command } = require("commander");
require('dotenv').config();
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
  .requiredOption(
    "--page <number>",
    "The page of movies data results to fetch",
    "1"
  )
  .option("-p, --popular", "Fetch the popular movies")
  .option("-n, --now-playing", "Fetch the movies that are playing now")
  .action(function handleAction(options) {
    console.log(options);
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .action(function handleAction() {
    console.log("hello-world");
  });

// error on unknown commands

program.parse(process.argv);
