#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();
program.version("0.0.1");
const { get } = require("./utils/httpServices");
const ora = require("ora");
require("dotenv").config();

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )
  //? .alias("letra que sustitulle al nombre")
  .action(function handleAction(options) {
    console.log(process.env.API_KEY);
    const url = `https://api.themoviedb.org/3/person/popular?page=${options.page}?api_key=${process.env.API_KEY}`;
    console.log(url);
    requestAsyncAwait(url);
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

async function requestAsyncAwait(url) {
  const spinner = ora("Fetching the popular person's data...").start();
  try {
    const data = await get(url);
    spinner.succeed();
    console.log(data);
  } catch (err) {
    spinner.fail();
    console.log(err);
  }
}
