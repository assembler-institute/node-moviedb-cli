#!/usr/bin/env node

const { Command } = require("commander");
const {
  getPersonsRequest,
  readLocalGetPersonsData,
} = require("./module/get_persons");
const { getPerson } = require("./module/getPersonRequest");

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
    getPerson(options);
  })
  .requiredOption("-i, --id <number>", "The id of the person");

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
