#!/usr/bin/env node
// Imports
// ---------------------------------------------------
require("dotenv").config({ path: "../.env" });
const {
  getPersons,
  getPersonById,
  getMovies,
  getMovieById,
  getReviews,
} = require("./requests.js");
const { undefinedTitle, checkFolder } = require("./assets/js/helpers.js");
const { asciiPrompt } = require("./assets/js/asciiPrompt.js");
const { l } = require("./assets/js/chalk.js");
const {
  renderGetPersons,
  renderGetPersonById,
  renderGetMovies,
  renderGetMovieById,
  renderMovieReviews,
} = require("./assets/js/render.js");
const { Command } = require("commander");
const ora = require("ora");
const fs = require("fs");
// const appendFile = require("fs");

// General variables
// ---------------------------------------------------
const program = new Command();

// General
// ---------------------------------------------------
program
  .version("0.0.1")
  .description("MovieDb database using CLI")
  .option("-s, --save", "Save request to file");

// Commands
//---------------------------------------------------
program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("--page <num>", "The page of persons data results to fetch")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .action((options) => {
    const spinner = ora("Fetching the popular person's data...\n").start();
    const isSave = program.opts().save;

    getPersons(options.page)
      .then((apiResponse) => {
        spinner.stop();
        if (isSave) {
          checkFolder("persons", "get-persons.json", apiResponse);
          // Ora suceed
          spinner.succeed(
            `Saved JSON of popular persons at page ${options.page}.`
          );
        } else {

          // Rendering every person's data
          renderGetPersons(options.page, apiResponse);
          
          // Ora suceed
          spinner.succeed(`Loaded popular persons at page ${options.page}`);
        }
      })
      .catch(() => {
        spinner.stop();
        if (isSave) {
          spinner.fail(
            `Couldn't save JSON of popular persons at page ${options.page}`
          );
        } else {
          spinner.fail(`Couldn't load popular persons at page ${options.page}`);
        }
      });
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <personId>", "The id of the person")
  .action((options) => {
    const spinner = ora("Fetching the person data...").start();
    const isSave = program.opts().save;

    getPersonById(options.id)
      .then((apiResponse) => {
        spinner.stop();
        if (isSave) {
          checkFolder("persons", "get-person.json", apiResponse);
          spinner.succeed(`Saved JSON of person with id ${options.id}`);
        } else {

          // Rendering the selected person's data
          renderGetPersonById(apiResponse);

          spinner.succeed(`Loaded person with id ${options.id}`);
        }
      })
      .catch(() => {
        spinner.stop();
        if (isSave) {
          spinner.fail(`Couldn't save JSON of person with id ${options.id}`);
        } else {
          spinner.fail(`Couldn't load person with id ${options.id}`);
        }
      });
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .requiredOption("--page <num>", "The page of movies data results to fetch")
  .option("-p, --popular", "Fetch the popular movies")
  .option("-n, --nowPlaying", "Fetch the movies that are playing now")
  .action((options) => {
    let spinner = ora().start();
    if (options.nowPlaying) {
      spinner.text = "Fetching data of movies that are being played now...";
    } else {
      spinner.text = "Fetching popular movies data...";
    }

    const isSave = program.opts().save;

    getMovies(options.page, options.nowPlaying)
      .then((apiResponse) => {
        spinner.stop();
        if (isSave && options.nowPlaying) {
          checkFolder("movies", "now-playing-movies.json", apiResponse);
          spinner.succeed(
            `Saved JSON with movies that are being played now at page ${options.page}`
          );
        } else if (isSave && !options.nowPlaying) {
          checkFolder("movies", "popular-movies.json", apiResponse);
          spinner.succeed(
            `Saved JSON with popular movies at page ${options.page}`
          );
        } else {

          // Rendering all movies in an specific page
          renderGetMovies(options.page, options.nowPlaying, apiResponse);

          if (options.nowPlaying) {
            spinner.succeed(
              `Loaded movies that are being played now at page ${options.page}`
            );
          } else {
            spinner.succeed(`Loaded popular movies at page ${options.page}`);
          }
        }
      })
      .catch(() => {
        spinner.stop();
        if (isSave) {
          if (options.nowPlaying) {
            spinner.fail(
              `Couldn't save JSON with movies that are being played now at page ${options.page}`
            );
          } else {
            spinner.fail(
              `Couldn't save JSON with popular movies at page ${options.page}`
            );
          }
        } else {
          if (options.nowPlaying) {
            spinner.fail(
              `Couldn't load movies that are being played now at page ${options.page}`
            );
          } else {
            spinner.fail(
              `Couldn't load popular movies at page ${options.page}`
            );
          }
        }
      });
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <num>", "The id of the movie data result to fetch")
  .option("-r, --reviews", "Fetch the reviews of the movie")
  .action((options) => {
    let spinner = ora("Fetching the requested movie data...").start();
    const isSave = program.opts().save;

    getMovieById(options.id)
      .then((apiResponse) => {
        spinner.stop();
        if (isSave) {
          checkFolder("movies", "get-movie.json", apiResponse);
          spinner.succeed(
            `Saved JSON with requested movie with ID:  ${options.id}.`
          );
          if (options.reviews) {
            getReviews(options.id)
              .then((apiResponseReviews) => {
                fs.open("resources/movies/get-movie.json", (err) => {
                  if (err) throw err;
                  fs.appendFile(
                    "resources/movies/get-movie.json",
                    "\n// REVIEWS \n" + JSON.stringify(apiResponseReviews),
                    (err) => {
                      if (err) throw err;
                      l("Saved reviews in JSON");
                    }
                  );
                });
              })
              .catch((e) => {
                l("Couldn't save reviews in JSON");
              });
          }
        } else {

          // Rendering the selected movie data
          renderGetMovieById(apiResponse);

          if (options.reviews) {
            let reviewSpinner = ora(
              "Fetching the requested movie reviews data..."
            ).start();

            getReviews(options.id)
              .then((apiResponseReviews) => {

                // Rendering Movie reviews
                renderMovieReviews(apiResponse, apiResponseReviews);

                reviewSpinner.succeed(
                  `Loaded requested movie ${options.id} reviews.`
                );
              })
              .catch(() => {
                reviewSpinner.stop();
                reviewSpinner.fail(
                  `Couldn't load movie ${options.id} reviews.`
                );
              });
          }
          spinner.succeed(`Loaded requested movie with ID:  ${options.id}.`);
        }
      })
      .catch(() => {
        spinner.stop();
        if (isSave) {
          spinner.fail(
            `Couldn't save JSON with requested movie with ID: ${options.id}.`
          );
        } else {
          spinner.fail(`Couldn't load requested movie with ID: ${options.id}.`);
        }
      });
  });

// error on unknown commands

program.parse(process.argv);
