#!/usr/bin/env node

const { Command } = require("commander");

const program = new Command();
program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption(
    "-x, --page <type>",
    "The page of persons data results to fetch",
    "1"
  )
  //? .alias("letra que sustitulle al nombre")
  .action(function handleAction() {
    const options = program.opts();
    console.log(`GET PERSONS -- PAGE ${options.args}`);
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
