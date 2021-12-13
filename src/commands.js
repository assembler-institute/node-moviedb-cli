#!/usr/bin/env node
//-----------------------------------requires--------------------------------------------------------
const { Command } = require("commander");
const { connectApi } = require("./methods");
const { getPerson } = require("./methods");
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


program

    .command("get-person")

    .description("Make a network request to fetch the data of a single person")

    .requiredOption("-i, --id <id>", "The id of the person")

    .action((options) => {
        getPerson(options.id);
    });

program.parse(process.argv);