#!/usr/bin/env node

const { Command } = require("commander");

const ora = require("ora");
const dotenv = require("dotenv");
dotenv.config();

const program = new Command();
program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page, <number>",
    "The page of persons data results to fetch"
  )
  .action(function handleAction() {
    const spinner = ora("Fetching the popular person's data...").start();
    console.log("hello-world");
    spinner.succeed("Popular persons data loaded");
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id", "The page of persons data results to fetch")
  .action(function handleAction() {
    const spinner = ora("Fetching the person's data...").start();
    console.log("hello-world");
    spinner.succeed("Person data loaded");
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
