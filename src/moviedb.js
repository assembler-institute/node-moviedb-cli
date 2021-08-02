#!/usr/bin/env node
const { Command } = require("commander");
const chalk = require("chalk");
require("dotenv").config();
const request = require("./utils/requestsMethods");
const render = require("./utils/renderMethods");
const fileSystem = require("./utils/fileSystemMethods");
const { spinner } = require("./utils/spinner");
const { notify } = require("./utils/notifier");

const program = new Command();

program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .option("--save", "Save the persons to /files/persons")
  .option("--local", "Fetch the persons from /files/persons")
  .action((options) => getPersons(options.page, options.local, options.save));

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <number> ", "The id of the person")
  .option("--save", "Save the movies to /files/movies")
  .option("--local", "Fetch the movies from /files/movies")
  .action((options) => {
    getPerson(options.id, options.local, options.save);
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .requiredOption("--page <number>", "The page of movies data results to fetch")
  .option("-p, --popular", "Fetch the popular movies")
  .option("-n, --now-playing", "Fetch the movies that are playing now")
  .option("--save", "Save the movies to /files/movies")
  .option("--local", "Fetch the movies from /files/movies")
  .action((options) =>
    getMovies(options.page, options.local, options.nowPlaying, options.save)
  );

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <number>", "The id of the movie")
  .option("--save", "Save the movies to /files/movies")
  .option("--local", "Fetch the movies from /files/movies")
  .option("-r, --reviews", "Fetch the reviews of the movie")
  .action((options) => {
    getMovie(options.id, options.reviews);
  });

program
  .command("interactive")
  .description("Interactive way to make the same requests")
  .action(async function handleAction() {
    const inquirer = require("inquirer");

    await inquirer
      .prompt([
        {
          type: "list",
          name: "actionOption",
          message: "What do you want fetch?",
          choices: [
            "Popular movies",
            "Now playing movies",
            "A specific movie",
            "Popular persons",
            "A specific person",
          ],
        },
        {
          type: "confirm",
          name: "fetchOption",
          message:
            "Do you want to fetch it from the web? The alternative is from a JSON stored",
          default: true,
        },
      ])
      .then(async (answers) => {
        if (answers["fetchOption"] === true) {
          await inquirer
            .prompt([
              {
                type: "confirm",
                name: "saveOption",
                message: "Do you want to save it to a file? (no by default)",
                default: false,
              },
            ])
            .then(async (saveAnswer) => {
              answers = { ...answers, ...saveAnswer };
              switch (answers["actionOption"]) {
                case "Popular movies":
                case "Now playing movies":
                case "Popular persons":
                  await inquirer
                    .prompt([
                      {
                        type: "number",
                        name: "page",
                        message: "What page do you want to fetch?",
                        validate(value) {
                          if (value === parseInt(value)) {
                            return true;
                          } else {
                            return "The page number must be a number";
                          }
                        },
                      },
                    ])
                    .then((answerPage) => {
                      answers = { ...answers, ...answerPage };
                    });
                  break;
                case "A specific movie":
                  await inquirer
                    .prompt([
                      {
                        type: "number",
                        name: "movieId",
                        message: "Id of the movie to fetch:",
                        validate(value) {
                          if (value === parseInt(value)) {
                            return true;
                          } else {
                            return "The id must be a number";
                          }
                        },
                      },
                      {
                        type: "confirm",
                        name: "reviewOption",
                        message:
                          "Do you want to see the movie reviews also? (no by default)",
                        default: false,
                      },
                    ])
                    .then((movieAnswers) => {
                      answers = { ...answers, ...movieAnswers };
                    });
                  break;
                case "A specific person":
                  await inquirer
                    .prompt([
                      {
                        type: "number",
                        name: "personId",
                        message: "Id of the person to fetch:",
                        validate(value) {
                          if (value === parseInt(value)) {
                            return true;
                          } else {
                            return "The id must be a number";
                          }
                        },
                      },
                    ])
                    .then((movieAnswers) => {
                      answers = { ...answers, ...movieAnswers };
                    });
                  break;
                default:
                  break;
              }
            });
        } else {
          if (answers["actionOption"] === "A specific movie") {
            await inquirer
              .prompt([
                {
                  type: "confirm",
                  name: "reviewOption",
                  message: "Fetch de reviews?",
                  default: false,
                },
              ])
              .then((movieAnswers) => {
                answers = { ...answers, ...movieAnswers };
              });
          }
        }
        const {
          page,
          fetchOption,
          actionOption,
          saveOption,
          movieId,
          reviewOption,
          personId,
        } = answers;
        const isLocal = !fetchOption;
        const isNowPlaying = actionOption === "Now playing movies";
        const isInteractive = true;
        switch (answers["actionOption"]) {
          case "Popular movies":
          case "Now playing movies":
            getMovies(page, isLocal, isNowPlaying, saveOption, isInteractive);
            break;
          case "A specific movie":
            getMovie(movieId, reviewOption, isLocal, saveOption, isInteractive);
            break;
          case "Popular persons":
            getPersons(page, isLocal, saveOption, isInteractive);
            break;
          case "A specific person":
            getPerson(personId, isLocal, saveOption, isInteractive);
            break;

          default:
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

//TODO error on unknown commands

program.parse(process.argv);

async function getMovies(page, isLocal, isNowPlaying, isSave, isInteractive) {
  spinner.start(
    `${chalk.bold(`${chalk.yellow("Fetching the movies data...")}`)}`
  );
  page = parseInt(page);
  let moviesJson = {};
  let spinnerText = "";
  try {
    if (isLocal === true) {
      if (isNowPlaying === true) {
        moviesJson = await fileSystem.loadMovies(isNowPlaying);
        spinnerText = "Movies playing now data loaded";
      } else {
        moviesJson = await fileSystem.loadMovies(isNowPlaying);
        spinnerText = "Popular movies data loaded";
      }
    } else {
      if (isNowPlaying === true) {
        moviesJson = await request.getNowPlayingMovies(page);
        spinnerText = "Movies playing now data loaded";
      } else {
        moviesJson = await request.getPopularMovies(page);
        spinnerText = "Popular movies data loaded";
      }
    }
    if (isSave === true) {
      await fileSystem.saveMovies(moviesJson, isNowPlaying);
      spinnerText += " and saved to file/movies";
      spinner.succeed(spinnerText);
      notify("Movies saved to file!");
    } else {
      if (moviesJson.page !== page && !isInteractive) {
        spinner.fail(
          chalk.bold(
            chalk.red(
              `You have stored the page number ${moviesJson.page} on your local`
            )
          )
        );
      } else {
        render.renderMovies(moviesJson);
        spinner.succeed(spinnerText);
      }
    }
  } catch (error) {
    setTimeout(() => {
      spinner.fail(chalk.bold(chalk.red(error)));
    }, 1000);
  }
}

async function getMovie(id, isReviews, isLocal, isSave, isInteractive) {
  try {
    spinner.start(
      `${chalk.bold(`${chalk.yellow("Fetching the movie data...")}`)}`
    );
    const movieId = parseInt(id);
    let singleMovieJson = {};
    let movieReviewsJson = {};
    if (isLocal === true) {
      singleMovieJson = await fileSystem.loadMovie();
      if (isReviews === true) {
        movieReviewsJson = await fileSystem.loadMovieReviews(movieId);
      }
    } else {
      singleMovieJson = await request.getMovie(movieId);
      if (isReviews === true) {
        movieReviewsJson = await request.getMovieReviews(movieId);
      }
    }
    if (isSave === true) {
      fileSystem.saveMovie(singleMovieJson);
      spinner.succeed("Movie data saved to file");
      notify("Movie data saved to file!");
      if (isReviews === true) {
        fileSystem.saveMovieReview(movieReviewsJson);
        spinner.succeed("Reviews data saved to file");
        notify("Reviews saved to file!");
      }
    } else {
      if (singleMovieJson.id !== movieId && !isInteractive) {
        spinner.fail(
          chalk.bold(
            chalk.red(
              `You have stored the movie with the id number ${singleMovieJson.id} on your local file`
            )
          )
        );
      } else {
        render.renderSingleMovie(singleMovieJson);
        if (isReviews === true) {
          render.renderReviews(movieReviewsJson);
          spinner.succeed("Movie reviews data loaded");
        } else {
          spinner.succeed("Movie data loaded");
        }
      }
    }
  } catch (error) {
    setTimeout(() => {
      spinner.fail(chalk.bold(chalk.red(error)));
    }, 1000);
  }
}

async function getPersons(page, isLocal, isSave, isInteractive) {
  spinner.start(
    `${chalk.bold(`${chalk.yellow(" Fetching the popular person's data...")}`)}`
  );
  page = parseInt(page);
  try {
    if (isLocal === true) {
      const json = await fileSystem.loadPopularPersons();
      if (json.page !== page && !isInteractive) {
        spinner.fail(
          chalk.bold(
            chalk.red(
              `You have stored the person on page number ${json.page} on your local file`
            )
          )
        );
      } else {
        render.renderPersons(json);
        spinner.succeed("Popular Persons data loaded");
      }
    } else if (isSave === true) {
      const json = await request.getPopularPersons(page);
      await fileSystem.savePopularPersons(json);
      spinner.succeed(
        "Popular Persons data saved to src/files/popular-persons.json"
      );
      notify("Persons saved to file!");
    } else {
      const json = await request.getPopularPersons(page);
      render.renderPersons(json);
      spinner.succeed("Popular Persons data loaded");
    }
  } catch (error) {
    setTimeout(() => {
      spinner.fail(chalk.bold(chalk.red(error)));
    }, 1000);
  }
}

async function getPerson(id, isLocal, isSave, isInteractive) {
  try {
    let json = {};
    spinner.start(
      `${chalk.bold(`${chalk.yellow("Fetching the person's data...")}`)}`
    );
    const personId = parseInt(id);
    if (isLocal === true) {
      json = await fileSystem.loadPerson();
    } else {
      json = await request.getPerson(personId);
    }
    if (isSave === true) {
      await fileSystem.savePerson(json);
      spinner.succeed("Person data saved to file");
      notify("Person saved to file!");
    } else {
      if (json.id !== personId && !isInteractive) {
        spinner.fail(
          chalk.bold(
            chalk.red(
              `You have stored the person with the id ${json.id} on your local file`
            )
          )
        );
      } else {
        render.renderPersonDetails(json);
        spinner.succeed("Person data loaded");
      }
    }
  } catch (error) {
    setTimeout(() => {
      spinner.fail(chalk.bold(chalk.red(error)));
    }, 1000);
  }
}
