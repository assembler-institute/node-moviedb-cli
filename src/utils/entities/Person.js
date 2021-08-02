const chalk = require("chalk");
const log = console.log;

class Person {
  constructor(person) {
    this.id = person.id;
    this.name = person.name;
    this.known_for_department = person.known_for_department;
    this.known_for = person.known_for;
    this.birthday = person.birthday;
    this.place_of_birth = person.place_of_birth;
    this.biography = person.biography;
    this.also_known_as = person.also_known_as;
  }

  renderPopular() {
    log("\n");
    log("Person: \n");
    log(`ID: ${chalk.white(this.id)}`);
    log(`Name: ${chalk.blue.bold(this.name)}`);

    // If department is Acting
    if (this.known_for_department == "Acting")
      log(`Department: ${chalk.magenta(this.known_for_department)}`);

    // if no titles
    const titles = this.known_for.filter((movie) => movie.title);
    if (!titles.length) {
      log(chalk.bgYellow.red(`\n\t${this.name} doesn’t appear in any movie\n`));
      return;
    }

    this.known_for.forEach((movie) => {
      if (movie.title) {
        log("\n");
        log(`\tMovie:`);
        log(`\tRelease date: ${chalk.white(movie.release_date)}`);
        log(`\tTitle: ${chalk.white(movie.title)}`);
      }
    });

    log(chalk.white("_________________________"));
    log("\n");
  }

  renderPersonById() {
    log("____________________________________\nPerson:\n");
    log(
      `ID: ${this.id} \nName: ${chalk.cyanBright(this.name)} \nBirthday: ${
        this.birthday
      } ${chalk.gray("|")} ${this.place_of_birth}`
    );
    if (this.known_for_department != null)
      log(`Department: ${chalk.magentaBright(this.known_for_department)}`);

    log(`Biography: ${chalk.cyanBright(chalk.bold(this.biography))} \n`);

    if (this.also_known_as) {
      log(`Also known as: \n`);
      this.also_known_as.forEach((element) => {
        log(element);
      });
    } else {
      log(`${chalk.yellow(this.name)} doesn’t have any alternate names`);
    }

    log("\n");
  }

  renderPages(page, total_pages) {
    log(chalk.white("________________________________________________"));
    log(chalk.white(`Page: ${page} of: ${total_pages}`));
    log("\n");
  }
}

module.exports = Person;
