#!/usr/bin/env node

const { Command } = require("commander");
require("dotenv").config();
// console.log(process.env.API_KEY);

const request = require("./utils/requestsMethods");

const render = require("./utils/renderMethods");

const program = new Command();
program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )
  .option("-p, --popular", "Fetch the popular persons")
  .action(async function handleAction(options) {
    const page = parseInt(options.page);
    const json = await request.getPopularPersons(page);
    render.renderPersons(json);
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <number> ", "The id of the person")
  .action(async function handleAction(options) {
    const personId = parseInt(options.id);
    const json = await request.getPerson(personId);
    render.renderPersonDetails(json);
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
