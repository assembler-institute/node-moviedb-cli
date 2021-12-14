#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();
program.version("0.0.1");
const {
  requestPersonsByPage,
  requestPersonById,
} = require("./utils/httpRequests");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )
  .action(function handleAction(options) {
    requestPersonsByPage(options.page);
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <number>", "The id of the person")
  .action(function handleAction(options) {
    requestPersonById(options.id);
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .action(function handleAction() {
    console.log("hello-world");
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .action(function handleAction() {
    console.log("hello-world");
  });

// error on unknown commands

program.parse(process.argv);
