import chalk from "chalk";

const log = console.log;

function personPagination(page, totalPages) {
  if (totalPages > page) {
    log(chalk.white(`----------------------------------------`));
    log(`Page: ${page} of: ${totalPages}`);
  }
}

function renderPersons(persons) {
  persons.foreach(function renderPerson(person) {
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
    if (person.also_known_as != "") {
      log(`\n`);
      log(`${chalk.white(`Also know as:\n`)}`);
    } else {
      log(`\n`);
      log(`${chalk.yellow(person.name)} doesn’t have any alternate names\n);
      `);
    }
  });
}

module.exports = {
  renderPersons: renderPersons,
  personPagination: personPagination,
};
