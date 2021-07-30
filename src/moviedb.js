#!/usr/bin/env node
/** @format */

const { Command } = require("commander");

const get = require("./utils/getMethods.js");
const dotenv = require("dotenv").config();

const program = new Command();
program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption("--page <number>", "The page of data results to fetch")
  .action(function handleAction(opt) {
    if (opt.page && opt.popular) get.PersonsByPage(opt.page);
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .option("-i, --id [id]", "The id of the person")
  .action(function handleAction(option) {
    if (option.id) get.PersonById(option.id);
  });

//./moviedb.js get-movies --popular --page 2
//./moviedb.js get-movies --now-playing --page 2
program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .option("-p, --popular", "Fetch the popular movies")
  .requiredOption("--page <number>", "The page of movies data results to fetch")
  .option("-n, --now-playing", "Fetch the movies that are playing now")
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
