const chalk = require("chalk");
const log = console.log;

class Person {
  constructor(person) {
    this.id = Person.id;
    this.name = Person.name;
    this.known_for_department = person.known_for_department;
    this.known_for = person.known_for;
  }

  renderPopular() {
    log("\n");
    log("Person: \n");
    log(`ID: ${chalk.white(this.id)}`);
    log(`Name: ${chalk.blue.bold(this.name)}`);

    if (this.known_for_department == "Acting")
      log(`Department: ${chalk.magenta(this.known_for_department)}`);

    this.known_for.forEach((movie) => {
      if (movie.title !== "undefined") {
        log("\n");
        log(`\tMovie:`);
        log(`\tRelease date: ${chalk.white(movie.release_date)}`);
        log(`\tTitle: ${chalk.white(movie.title)}`);
        log("\n");
      } else {
        log(`\t${chalk.white(this.name)} doesn’t appear in any movie\n:`);
      }
    });

    log("\n");
  }
}

module.exports = Person;
