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

program.parse(process.argv);