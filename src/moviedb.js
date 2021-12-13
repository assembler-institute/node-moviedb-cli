#!/usr/bin/env node
require("dotenv").config();
const { Command } = require("commander");
const https = require("https");
const KEY = process.env.API_KEY;
const ora = require("ora");
const program = new Command();
program.version("0.0.1");
const {
  renderPersonsData,
  renderPersonData,
  renderMovieData,
  renderMoviesData,
} = require("../utils/render");

//get popular persons by page, command:
program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .action(function getPersons(options) {
    const fetch = {
      href: "https://api.themoviedb.org",
      protocol: "https:",
      hostname: "api.themoviedb.org",
      path: `/3/person/popular?page=${options.page}&api_key=${KEY}`,
      method: "GET",
    };
    const spinner = ora("Loading popular people").start();
    const req = https.request(fetch, (res) => {
      let responseBody = "";

      res.on("data", function onData(resData) {
        responseBody += resData;
      });

      res.on("end", function onEnd() {
        const data = JSON.parse(responseBody);

        renderPersonsData(data.page, data.total_pages, data.results);

        spinner.succeed("Popular Persons - Loaded");
      });
    });

    req.on("error", () => {
      ora.error("Error: Network request fails");
    });
    req.end();
  });

//get single person by id, command:
program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("--id <id>", "The id of the person")
  .action(function getPerson(options) {
    const fetch = {
      href: "https://api.themoviedb.org",
      protocol: "https:",
      hostname: "api.themoviedb.org",
      path: `/3/person/${options.id}?api_key=${KEY}`,
      method: "GET",
    };
    const spinner = ora("Fetching the person data...").start();
    const req = https.request(fetch, (res) => {
      let responseBody = "";
      res.on("data", function onData(resData) {
        responseBody += resData;
      });

      res.on("end", function onEnd() {
        const data = JSON.parse(responseBody);
        renderPersonData(data);

        spinner.succeed("Person data - Loaded");
      });
    });

    req.on("error", (e) => {
      ora.error("Error: Network request fails");
    });
    req.end();
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .requiredOption("--page <number>", "The page of movies data results to fetch")
  .option("--popular, -p", "Fetch the popular movies")
  .option("--now-playing -n", "Fetch the movies that are playing now")
  .action(function getMovies(options) {
    let path = ""
    const programOptions = program.opts();
    if (programOptions.popular) {
      path = `/3/movie/popular?page=${options.page}&api_key=${KEY}`;
    } else if (programOptions.nowPlaying) {
      path = `/3/movie/now_playing?page=${options.page}&api_key=${KEY}`;
    } else if (!programOptions.nowPlaying && !programOptions.popular) {
      path = `/3/movie/popular?page=${options.page}&api_key=${KEY}`;
    }

    const fetch = {
      href: "https://api.themoviedb.org",
      protocol: "https:",
      hostname: "api.themoviedb.org",
      path: path,
      method: "GET",
    };

    const spinner = ora("Loading popular people").start();
    const req = https.request(fetch, (res) => {
      let responseBody = "";

      res.on("data", function onData(resData) {
        responseBody += resData;
      });

      res.on("end", function onEnd() {
        const data = JSON.parse(responseBody);
        console.log("data:", data);
        spinner.succeed("Movies - Loaded");
      });
    });

    req.on("error", () => {
      ora.error("Error: Network request fails");
    });
    req.end();
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .action(function handleAction() {
    console.log("hello-world");
  });

// error on unknown commands

program.parse(process.argv);
