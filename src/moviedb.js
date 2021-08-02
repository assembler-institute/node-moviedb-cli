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
  .requiredOption("--page <number>", "The page of data results to fetch")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .option("-s, --save", "The page of data to JSON file")
  .option("-l, --local", "Read data from local JSON")
  .action(function handleAction(opt) {
    if (!opt.local) get.PersonsByPage(opt.page, opt.save);
    if (opt.local) get.JsonPersonByPage(opt.page);
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <id>", "The id of the person")
  .action(function handleAction(option) {
    if (option.id) get.PersonById(option.id);
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .requiredOption("--page <number>", "The page of movies data results to fetch")
  .option("-p, --popular", "Fetch the popular movies")
  .option("-n, --now-playing", "Fetch the movies that are playing now")
  .option("-s, --save", "The page of data to JSON file")
  .option("-l, --local", "Read data from local JSON")
  .action(function handleAction(opt) {
    get.MoviesByPage(opt.page, opt.nowPlaying, opt.save);
    if (opt.local) get.JsonMoviesByPage(opt.page, opt.nowPlaying);
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .action(function handleAction() {
    console.log("hello-world");
  });

// error on unknown commands

program.parse(process.argv);
