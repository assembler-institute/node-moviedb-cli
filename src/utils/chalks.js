/** @format */

const chalk = require("chalk");

const Person = require("./entities/Person.js");
const Movie = require("./entities/Movie.js");

const log = console.log;

/**
 * Render People in command line
 * @param page : Response object of type person
 * @param spinner : a Spinner to render
 */
function chalkPeople(page, spinner) {
  try {
    setTimeout(() => {
      page.results.forEach((person, index, array) => {
        const chalkPerson = new Person(person);
        chalkPerson.renderPopular();

        if (index == array.length - 1) {
          log(chalk.white("---------------------------------------------"));
          log(chalk.white(`Page: ${page.page} of: ${page.total_pages}`));
          log("\n");
          return;
        }

        log(chalk.white("----------------------"));
      });

      spinner.succeed("Popular Persons data loaded");

      log("\n");
    }, 1000);
  } catch (error) {
    spinner.fail(error.message);
  }
}

function chalkPersonId(person, spinner) {
  try {
    setTimeout(() => {
      const chalkPerson = new Person(person);
      chalkPerson.renderPersonById();

      spinner.succeed("Popular Persons data loaded");
      log("\n");
    }, 1000);
  } catch (error) {
    spinner.fail(error.message);
  }
}

/**
 * Render Movie in command line
 * @param page : Response object of type movie
 * @param spinner : a Spinner to render
 */
function chalkMovie(page, spinner, nowPlaying) {
  try {
    setTimeout(() => {
      page.results.forEach((movie, index, array) => {
        const chalkMovie = new Movie(movie);
        chalkMovie.renderPopular();

        if (index == array.length - 1) {
          log(chalk.white("---------------------------------------------"));
          log(chalk.white(`Page: ${page.page} of: ${page.total_pages}`));
          log("\n");
          return;
        }

        log(chalk.white("----------------------"));
      });

      if (nowPlaying) spinner.succeed("Movies playing now data loaded");
      else {
        spinner.succeed("Popular Movies data loaded");
      }
      log("\n");
    }, 1000);
  } catch (error) {
    spinner.fail(error.message);
  }
}

module.exports = { chalkPeople, chalkMovie, chalkPersonId };
