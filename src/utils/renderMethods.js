const chalk = require("chalk");
const log = console.log;

// function personPagination(page, total_pages) {
//   if (total_pages > page) {
//     log(chalk.white(`----------------------------------------`));
//     log(`Page: ${page} of: ${total_pages}`);
//   }
// }

function renderPersons(persons) {
  if (persons.total_pages > persons.page) {
    log(chalk.white(`----------------------------------------`));
    log(`Page: ${persons.page} of: ${persons.total_pages}`);
  }
  persons.results.forEach((person) => {
    log(chalk.white(`----------------------------------------`));
    log(`\n`);
    log(`${chalk.white}Person:\n`);
    log(`ID:${chalk.white(person.id)}`);
    log(`Name:${chalk.blue(person.name)}`);

    if (person.known_for_department === "Acting") {
      log(`Department:${chalk.magenta(person.known_for_department)}`);
    }
    let appearsInMovie = false;
    person.known_for.forEach((alias) => {
      if (alias.title !== undefined) {
        log(`\n`);
        log(`\t${chalk.white("Movie:")}`);
        log(`\t${chalk.white("ID: ")}${chalk.white(alias.id)}`);
        log(
          `\t${chalk.white("Release date: ")}${chalk.white(
            alias.realease_date
          )}`
        );
        log(`\t${chalk.white("Title: ")}${chalk.white(alias.title)}\n`);
        appearsInMovie = true;
      }
    });

    if (appearsInMovie === false) {
      log(`${chalk.white(`${person.name} doesn’t appear in any movie`)}\n`);
    }
  });
}

function renderPersonDetails(persons) {
  persons.results.forEach((person) => {
    log(chalk.white(`----------------------------------------`));
    log(`\n`);
    log(`${chalk.white}Person:\n`);
    log(`ID:${chalk.white(person.id)}`);
    log(`Name:${chalk.blue(person.name)}`);
    log(
      `Birthday:${chalk.white(person.birthday)} ${chalk.gray(
        "|"
      )} ${chalk.white(person.place_of_birth)}`
    );
    log(`Biography:${chalk.blue.bold(person.biography)}`);

    if (person.known_for_department === "Acting") {
      log(`Department:${chalk.magenta(person.known_for_department)}`);
    }
    let appearsInMovie = false;
    person.known_for.forEach((alias) => {
      if (alias.title !== undefined) {
        log(`\n`);
        log(`\t${chalk.white("Movie:")}`);
        log(`\t${chalk.white("ID: ")}${chalk.white(alias.id)}`);
        log(
          `\t${chalk.white("Release date: ")}${chalk.white(
            alias.realease_date
          )}`
        );
        log(`\t${chalk.white("Title: ")}${chalk.white(alias.title)}\n`);
        appearsInMovie = true;
      }
    });

    if (appearsInMovie === false) {
      log(`${chalk.white(`${person.name} doesn’t appear in any movie`)}\n`);
    }
    // if (person.known_for.length != 0) {
    //   log(`\n`);
    //   log(`${chalk.white(`Also know as:\n`)}`);
    // } else {
    //   log(`\n`);
    //   log(`${chalk.yellow(person.name)} doesn’t have any alternate names\n);
    //   `);
    // }
  });
}

module.exports = {
  renderPersons: renderPersons,
  // personPagination: personPagination,
};
