#!/usr/bin/env node

const { Command } = require("commander");

const func = require("./utils/getMethods.js");
const dotenv = require("dotenv").config();

const program = new Command();
program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .option("-p, --popular", "Fetch the popular persons")
  .option("--page <page>", "The page of persons data results to fetch")
  .action(function handleAction(options) {
    if (options.page) func.getPersonsByPage(options.page);
    if (options.popular) func.getPopularPersons(options.popular);
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
