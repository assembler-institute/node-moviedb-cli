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
const { asciiPrompt } = require("./asciiPrompt.js");
const { Command } = require("commander");
const { l } = require("./chalk.js");
const chalk = require("chalk");
const { yellow } = require("chalk");

const program = new Command();

// General variables
// ---------------------------------------------------
const apiKey = process.env.API_KEY;

// Helpers
// ---------------------------------------------------

// console.log("This is the API key: ", chalk.blue(apiKey));

let undefinedTitle = function returnUndefined(element) {
  if (element === undefined) {
    return true;
  }
};

// General
// ---------------------------------------------------
program.version("0.0.1").description("MovieDb database using CLI");

// Commands
//---------------------------------------------------
program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("--page <num>", "The page of persons data results to fetch")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .action((options) => {
    // console.log(chalk.yellow.bold("Get persons at page: "), options.page);
    getPersons(options.page).then((apiResponse) => {
      asciiPrompt("Popular persons");

      l(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n");
      l(`Page: ${options.page} of ${apiResponse.total_pages}\n`);
      l(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n");

      apiResponse.results.forEach((person) => {
        l("----------------------------------------\n");
        l("PERSON \n\n");
        l("Id: ", "white", true);
        l(person.id + "\n");
        l("Name: ", "white", true);
        l(person.name + "\n", "blue", true);
        if (person.known_for_department === "Acting") {
          l("Deparment: ", "white", true);
          l(person.known_for_department + "\n", "magenta");
        }

        // Get all movies names
        let movies = new Array();
        person.known_for.forEach((m) => movies.push(m.title));

        // Check if all are titles undefined
        l("Movie carreer: \n", "white", true);
        if (!movies.every(undefinedTitle)) {
          person.known_for.forEach((movie) => {
            // Only show not undefined titles
            if (movie.title != undefined) {
              l("\tMovie:");
              l(`\t${movie.id}`);
              l(`\t${movie.title}`);
              l(`\t${movie.release_date} \n`);
            }
          });
        } else {
          // If only appears in tv shows
          l(`${person.name} doesn’t appear in any movie.\n`, "red");
        }
      });
    });
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <personId>", "The id of the person")
  .action((options) => {
    getPersonById(options.id).then((apiResponse) => {
      let person = apiResponse;
      asciiPrompt(person.name);
      // l("----------------------------------------\n");
      // l("PERSON \n\n");
      l("Id: ", "white", true);
      l(person.id + "\n");
      l("Name: ", "white", true);
      l(person.name + "\n", "blue", true);
      l("Birthday: ", "white", true);
      if (person.birthday && person.place_of_birth) {
        l(person.birthday + " | " + person.place_of_birth + "\n");
      } else {
        l(`No birthday data of ${person.name}.\n`, "red", true);
      }
      if (person.known_for_department === "Acting") {
        l("Deparment: ", "white", true);
        l(person.known_for_department + "\n", "magenta");
      }
      if (person.biography) {
        l("Biography: ", "white", true);
        l(person.biography + "\n", "blue", true);
      }
      l("Also known as: \n", "white", true);
      if (person.also_known_as != undefined) {
        person.also_known_as.forEach((aka) => {
          l(`\t · ${aka}\n`);
        });
      } else {
        l(`\n${person.name} doesn’t have any alternate names\n`, "red", true);
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
    getMovies(options.page, options.nowPlaying).then((apiResult) => {
      // Formatting and printing output on console
      l(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      l(`Page: ${options.page} of ${apiResult.total_pages}\n`);

      apiResult.results.forEach((movie) => {
        l("----------------------------------------\n");
        l("MOVIE \n");
        l("Id: ", "yellow", true);
        l(movie.id + "\n");
        l("Title: ", "blue", true);
        l(movie.title + "\n", "white", true);
        l("Release date: ", "magenta", true);
        l(movie.release_date + "\n");
        if (apiResult.results[apiResult.results.length - 1] === movie) {
          l("----------------------------------------\n");
        }
      });
    });
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-id, --id <num>", "The id of the movie data result to fetch")
  .option("-r, --reviews", "Fetch the reviews of the movie")
  .action((options) => {
    getMovieById(options.id).then((apiResult) => {
      l(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      l("\nMOVIE Id: ", "white", false);
      l(apiResult.id, "white", false);
      l("\n");
      l("Title: ", "blue", false);
      l(apiResult.original_title, "blue", true);
      l("\n");
      l("Release date: ", "white", false);
      l(apiResult.release_date, "white", true);
      l("\n");
      l("Runtime: ", "white", false);
      l(apiResult.runtime, "white", true);
      l("\n");
      l("Votecount: ", "white", false);
      l(apiResult.vote_count, "white", true);
      l("\n");
      l("Overview: ", "white", false);
      l(apiResult.overview, "white", true);
      l("\n\n");

      if (options.reviews) {
        getReviews(options.id).then((apiResultReviews) => {
          if (apiResultReviews.total_pages > 0) {
            apiResultReviews.results.forEach((review) => {
              l(`Author: `, "white", false);
              l(`${review.author}`, "blue", true);
              l("\n");
              l(`Content: `, "white", false);
              l(`${review.content} `, "white", false);
              l("\n\n---\n\n");
            });
          } else {
            l(
              `The movie: ${options.id} doesn’t have any reviews`,
              "yellow",
              true
            );
          }
        });
      }
    });
  });

// error on unknown commands

program.parse(process.argv);
