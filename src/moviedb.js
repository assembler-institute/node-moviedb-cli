#!/usr/bin/env node

const { Command } = require("commander");

const program = new Command();

program.version("0.0.1")

  .arguments("<username>")

  .arguments("<password>")

  .description("Get your movie list")

  .action((username, password) => {

    console.log(username, password);

  })

program

  .command("get-persons")

  .description("Make a network request to fetch most popular persons")

  .action(function handleAction() {

    console.log("hello-world");

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

program

  .option("-v, --verbose", "A value indicating whether output should be verbose")
  

// error on unknown commands



program.parse(process.argv);