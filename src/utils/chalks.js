const chalk = require("chalk");

const Person = require("./entities/Person.js");

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

module.exports = { chalkPeople };
