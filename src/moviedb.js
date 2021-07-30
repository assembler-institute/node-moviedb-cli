#!/usr/bin/env node
// Imports
// ---------------------------------------------------
require("dotenv").config({ path: "../.env" });
const { getPersons } = require("./requests.js");
const { Command } = require("commander");
const { l } = require("./chalk.js");
const chalk = require("chalk");

const program = new Command();

// General variables
// ---------------------------------------------------
const apiKey = process.env.API_KEY;

// Helpers
// ---------------------------------------------------

// console.log("This is the API key: ", chalk.blue(apiKey));

let undefinedTitle = function returnUndefined(element) {
  if (element === undefined) {
    return true;
  }
};

// General
// ---------------------------------------------------
program.version("0.0.1").description("MovieDb database using CLI");

// Commands
//---------------------------------------------------
program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("--page <num>", "The page of persons data results to fetch")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .action((options) => {
    // console.log(chalk.yellow.bold("Get persons at page: "), options.page);

    getPersons(options.page).then((apiResult) => {
      l(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      l(`Page: ${options.page} of ${apiResult.total_pages}\n`);

      apiResult.results.forEach((person) => {
        l("----------------------------------------\n");
        l("PERSON \n");
        l("Id: ", "white", true);
        l(person.id);
        l("Name: ", "white", true);
        l(person.name, "blue", true);
        if (person.known_for_department) {
          l("Deparment: ", "white", true);
          l(person.known_for_department, "magenta");
        }
        l("Movie carreer: ", "white", true);

        // Get all movies names
        let movies = new Array();
        person.known_for.forEach((m) => movies.push(m.title));

        // Check if all are titles undefined
        if (!movies.every(undefinedTitle)) {
          l("Appearing in: ");
          l("\n");
          person.known_for.forEach((movie) => {
            // Only show not undefined titles
            if (movie.title != undefined) {
              l("\tMovie:");
              l(`\t${movie.id}`);
              l(`\t${movie.title}`);
              l(`\t${movie.release_date}`);
              l("\n");
            }
          });
        } else {
          // If only appears in tv shows
          l(`${person.name} doesn’t appear in any movie. \n`, "red");
        }
      });
    });
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
  .requiredOption("--id <num>", "The id of the movie data result to fetch")
  .action((options) => {
    console.log(`Movie ID fetched: `, options.id);
  });

// error on unknown commands

program.parse(process.argv);
