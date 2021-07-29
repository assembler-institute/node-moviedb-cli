#!/usr/bin/env node
const { Command } = require("commander");
const dotenv = require("dotenv");
const program = new Command();

dotenv.config();

console.log("This is the API key: ", process.env.API_KEY);
program.version("0.0.1");

// Options ---------------------------------------------------
program
  // Get persons
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption("--page", "The page of persons data results to fetch");

const opt = program.opts();
// debugger;
console.log(opt);

// Commands ---------------------------------------------------
program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .action(function handleAction() {
    console.log("Get persons at page: ", opt.page);
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
