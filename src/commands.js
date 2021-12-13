#!/usr/bin/env node
//-----------------------------------requires--------------------------------------------------------
const { Command, helpOption, option } = require("commander");
const { connectApi } = require("./methods");
const { getPerson } = require("./methods");
const { getMovies } = require("./methods");
const { load } = require("./saveload");
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
    .option('-s, --save', 'Save the result to a file')
    .option('-l, --load', 'Load the result from a file')
    .action((page, options) => {
        if (options.load) {
            load('persons.json')
        } else {
            connectApi(page, options)
        }
    });


program

    .command("get-person")

    .description("Make a network request to fetch the data of a single person")

    .requiredOption("-i, --id <id>", "The id of the person")

    .action((options) => {
        getPerson(options.id);
    });




program

    .command("get-movies <page>")
    .description("Make a network request to fetch most popular movies")
    .requiredOption('--page', 'Fetch the popular movies')
    .option('-p, --popular', 'Fetch the popular movies')
    .option('-n, --now-playing', 'Fetch the now playing movies')
    .option('-s, --save', 'Save the movies to a file')
    .option('-l, --local', 'Fetch the movies from a local file')
    .action((page, options) => {
        if (options.local) {
            load('movies.json');
        }
        else {
            getMovies(page, options);
        }
    });

program.parse(process.argv);
