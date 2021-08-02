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
const { Command } = require("commander");
const ora = require("ora");

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
            l("\n");
          });
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
          let person = apiResponse;
          asciiPrompt(person.name);

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
            l(
              `\n${person.name} doesn’t have any alternate names\n`,
              "red",
              true
            );
          }
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

    getMovies(options.page, options.nowPlaying)
      .then((apiResponse) => {
        spinner.stop();
        l(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        l(`Page: ${options.page} of ${apiResponse.total_pages}\n`);

        apiResponse.results.forEach((movie) => {
          l("----------------------------------------\n");
          l("MOVIE \n");
          l("Id: ", "yellow", true);
          l(movie.id + "\n");
          l("Title: ", "blue", true);
          l(movie.title + "\n", "white", true);
          l("Release date: ", "magenta", true);
          l(movie.release_date + "\n\n");
        });
        if (options.nowPlaying) {
          spinner.succeed(
            `Loaded movies that are being played now at page ${options.page}`
          );
        } else {
          spinner.succeed(`Loaded popular movies at page ${options.page}`);
        }
      })
      .catch(() => {
        spinner.stop();

        if (options.nowPlaying) {
          spinner.fail(
            `Couldn't load movies that are being played now at page ${options.page}`
          );
        } else {
          spinner.fail(`Couldn't load popular movies at page ${options.page}`);
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

    getMovieById(options.id)
      .then((apiResponse) => {
        spinner.stop();
        let movie = apiResponse;
        asciiPrompt(movie.original_title);

        l("Id: ", "white", true);
        l(movie.id + "\n", "white");
        l("Title: ", "white", true);
        l(movie.original_title + "\n", "blue", true);
        l("Release date: ", "white", true);
        l(movie.release_date + "\n", "white");
        l("Runtime: ", "white", true);
        l(movie.runtime + "\n", "white");
        l("Vote count: ", "white", true);
        l(movie.vote_count + "\n", "white");
        l("Overview: ", "white", true);
        l(movie.overview + "\n", "white");

        if (movie.spoken_languages) {
          l("Spoken languages: \n", "white", true);
          movie.spoken_languages.forEach((language) => {
            l(`\t · ${language.name}\n`);
          });
        } else {
          l(
            `The movie: ${movie.original_title} doesn’t have any declared languages.`
          );
        }
        l("\n");

        if (options.reviews) {
          let reviewSpinner = ora(
            "Fetching the requested movie reviews data..."
          ).start();

          getReviews(options.id)
            .then((apiResponseReviews) => {
              if (apiResponseReviews.total_pages > 0) {
                apiResponseReviews.results.forEach((review) => {
                  l("Author: ", "white", true);
                  l(review.author + "\n", "blue", true);
                  l("Content: ", "white", true);
                  if (review.content.length > 400) {
                    l(review.content.slice(0, 400) + "...");
                  } else {
                    l(review.content, "white", false);
                  }
                  l("\n\n---\n\n");
                });
              } else {
                l(
                  `The movie: ${movie.original_title} doesn’t have any reviews.`,
                  "red",
                  true
                );
              }
              reviewSpinner.succeed(
                `Loaded requested movie ${options.id} reviews.`
              );
            })
            .catch(() => {
              reviewSpinner.stop();
              reviewSpinner.fail(`Couldn't load movie ${options.id} reviews.`);
            });
        }
        spinner.succeed(`Loaded requested movie with ID:  ${options.id}.`);
      })
      .catch(() => {
        spinner.stop();
        spinner.fail(`Couldn't load requested movie with ID: ${options.id}.`);
      });
  });

// error on unknown commands

program.parse(process.argv);
