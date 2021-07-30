#!/usr/bin/env node

const { Command } = require("commander");
const ora = require("ora");
const dotenv = require("dotenv");
dotenv.config();
const https = require("https");

const chalk = require("chalk");

const { getPersons, getPerson } = require("./utils/httpsRequest");

const requestOptions = {
  href: "https://api.themoviedb.org",
  protocol: "https:",
  hostname: "api.themoviedb.org",
  path: ``,
  // path: `/3/person/popular?page=1&api_key=f599dfd0f0fe1ae38c4420cd239f2cd2`,
  port: 443,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};

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
  .action(async function handleAction(programOptions) {
    const spinner = ora("Fetching the popular person's data...").start();
    console.log("hello-world");

    requestOptions.path = `/3/person/popular?page=${programOptions.page}`;
    data = await getPersons(requestOptions);
    // console.log(persons);

    data.results.forEach((person) => {
      console.log(
        `PERSON: 
    
    ID: ${person.id}
    Name: ${chalk.bold.blue(person.name)}
    Departament: ${chalk.magenta(person.known_for_department)}\n\n`
      );

      person.known_for.forEach((movies) => {
        if (movies.original_title == undefined) {
          console.log(`${chalk.yellow.dim("There's no movive ")}`);
        } else {
          console.log(
            `\tMovie:
        \tID: ${chalk.green(movies.id)}
        \tRelease Date: ${chalk.green(movies.release_date)}
        \tTitle: ${chalk.green(movies.original_title)}`
          );
        }
      });

      console.log(
        `--------------------------------------------------------\n\n`
      );
    });

    spinner.succeed("Popular persons data loaded");
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id", "The page of persons data results to fetch")
  .action(async function handleAction(programOptions) {
    const spinner = ora("Fetching the person's data...").start();
    const id = programOptions.args.toString();
    requestOptions.path = `/3/person/${id}`;
    data = await getPerson(requestOptions);
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
