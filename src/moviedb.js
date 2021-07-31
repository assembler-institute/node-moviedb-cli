#!/usr/bin/env node

const { Command } = require("commander");
require("dotenv").config();
// console.log(process.env.API_KEY);

const program = new Command();
program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")

  .action(function handleAction() {});

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person");
requiredOption("-i, --id <number> ", "The id of the person");
action(async function handleAction(options) {
  const personId = parseInt(options.id, 10);
  const json = await request.getPerson(personId);
  console.log(json);
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
