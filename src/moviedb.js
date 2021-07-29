#!/usr/bin/env node
// Imports
require("dotenv").config({ path: "../.env" });
const { Command } = require("commander");
const chalk = require("chalk");
const program = new Command();

// General variables
const apiKey = process.env.API_KEY;
let opts;

program.version("0.0.1");

// Options ---------------------------------------------------
program
  .option("--page <number>", "The page of persons data results to fetch")
  .option("-p, --popular", "Fetch the popular persons");

// Commands ---------------------------------------------------
program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .action(() => {
    opts = program.opts();
    console.log(chalk.yellow.bold("Get persons at page: "), opts.page);
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

/* -------------------------------------------------------------------------- */
/*                                    Test                                    */
/* -------------------------------------------------------------------------- */
console.log("This is the API key: ", chalk.blue(apiKey));
