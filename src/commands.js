#!/usr/bin/env node
//-----------------------------------requires--------------------------------------------------------
const { Command, helpOption } = require("commander");
const { connectApi } = require("./methods");
const { getPerson } = require("./methods");
const { getMovies } = require("./methods");
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




program

    .command("get-movies <page>")
    .description("Make a network request to fetch most popular movies")
    .requiredOption('--page', 'Fetch the popular movies')
    .option('-p, --popular', 'Fetch the popular movies')
    .option('-n, --now-playing', 'Fetch the now playing movies')
    .action((page, options, nowPlaying) => {
        if (options.popular) {
            options.popular = true;
        }
        if (nowPlaying) {
            nowPlaying = true;
        }
        getMovies(page, options.popular, nowPlaying);
    });

program.parse(process.argv);
