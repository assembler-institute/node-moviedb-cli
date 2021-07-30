#!/usr/bin/env node
// Imports
// ---------------------------------------------------
require("dotenv").config({ path: "../.env" });
const { getPersons } = require("./requests.js");
const { Command } = require("commander");
const chalk = require("chalk");
const program = new Command();

// General variables
// ---------------------------------------------------
const apiKey = process.env.API_KEY;

/* -------------------------------------------------------------------------- */
/*                                    Test                                    */
/* -------------------------------------------------------------------------- */
console.log("This is the API key: ", chalk.blue(apiKey));

function l(text, color) {
  switch (color) {
    case "black":
      console.log(chalk.black(text));
      break;
    case "red":
      console.log(chalk.red(text));
      break;
    case "green":
      console.log(chalk.green(text));
      break;
    case "yellow":
      console.log(chalk.yellow(text));
      break;
    case "blue":
      console.log(chalk.blue(text));
      break;
    case "magenta":
      console.log(chalk.magenta(text));
      break;
    case "cyan":
      console.log(chalk.cyan(text));
      break;
    default:
      console.log(chalk.white(text));
  }
}
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
    console.log(chalk.yellow.bold("Get persons at page: "), options.page);
    getPersons(options.page).then((result) => {
      result.results.forEach((person) => {
        l("----------------------------------------\n");
        l(person.id);
        l(`Name: ${person.name}`, "blue");
        if (person.known_for_department) {
          l(`Deparment: ${person.known_for_department}`, "magenta");
        }
        if (person.known_for !== undefined) {
          l("Appearing in: ");
          l("\n");
          person.known_for.forEach((movie) => {
            l(`\t${movie.id}`);
            l(`\t${movie.title}`);
            l(`\t${movie.release_date}`);
            l("\n");
          });
        } else {
          l(`${person.name} doesn’t appear in any movie. \n`);
        }
        // console.log(person.name);
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
  .action(function handleAction() {
    console.log("hello-world");
  });

// error on unknown commands

program.parse(process.argv);
