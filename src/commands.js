#!/usr/bin/env node
 //-----------------------------------requires--------------------------------------------------------
const { Command } = require("commander");
const { connectApi } = require("./methods");

//----------------------------------- ########--------------------------------------------------------
const program = new Command();

program
    .version("0.0.1")
    .description("moviedb-cli")

program
    .command("get-persons <page>")
    .requiredOption('-p, --popular', 'Fetch the popular persons')
    .requiredOption('--page', 'Fetch the popular persons')
    .description("Make a network request to fetch most popular persons")
    .action((page) => {
        connectApi(page)
    });



// program

//     .command("get-person")

// .description("Make a network request to fetch the data of a single person")

// .action(function handleAction() {

//     console.log("hello-world");

// });



// program

//     .command("get-movies")

// .description("Make a network request to fetch movies")

// .action(function handleAction() {

//     console.log("hello-world");

// });

// program

//     .command("get-movie")

// .description("Make a network request to fetch the data of a single person")

// .action(function handleAction() {

//     console.log("hello-world");

// });

// program

//     .option("-v, --verbose", "A value indicating whether output should be verbose")


// error on unknown commands



program.parse(process.argv);