const chalk = require("chalk");
const log = console.log;

function renderPersons(persons) {
  if (persons.total_pages > persons.page) {
    log(`${chalk.white(`----------------------------------------`)}`);
    log(`Page: ${persons.page} of: ${persons.total_pages}`);
  }
  persons.results.forEach((person) => {
    log(chalk.white(`----------------------------------------`));
    log(`\n`);
    log(`${chalk.white("Person: ")} \n`);
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

function renderPersonDetails(person) {
  log(chalk.white(`----------------------------------------`));
  log(`\n`);
  log(`${chalk.white("Person: ")} \n`);
  log(`ID:${chalk.white(person.id)}`);
  log(`Name:${chalk.blue(person.name)}`);
  log(
    `Birthday:${chalk.white(person.birthday)} ${chalk.gray("|")} ${chalk.white(
      person.place_of_birth
    )}`
  );
  log(`Biography:${chalk.blue.bold(person.biography)}`);

  if (person.known_for_department === "Acting") {
    log(`Department:${chalk.magenta(person.known_for_department)}`);
  }
  log(`\n`);
  log(`${chalk.white(`Also know as:`)} \n`);
  if (person.also_known_as.length > 0) {
    person.also_known_as.forEach((alias) => {
      log(`${chalk.white(alias)}`);
    });
  } else {
    log(`\n`);
    log(`${chalk.yellow(`${person.name} doesn’t have any alternate names`)}\n`);
  }
}

module.exports = {
  renderPersons: renderPersons,
  renderPersonDetails: renderPersonDetails,
};
