/** @format */

const chalk = require("chalk");
const log = console.log;

class Movie {
  constructor(movie) {
    this.id = movie.id;
    this.name = movie.name;
    this.known_for_department = movie.known_for_department;
    this.known_for = movie.known_for;
    this.birthday = movie.birthday;
    this.place_of_birth = movie.place_of_birth;
    this.biography = movie.biography;
    this.also_known_as = movie.also_known_as;
  }

  // renderPopular() {
  //   log("\n");
  //   log("Person: \n");
  //   log(`ID: ${chalk.white(this.id)}`);
  //   log(`Name: ${chalk.blue.bold(this.name)}`);

  //   if (this.known_for_department == "Acting")
  //     log(`Department: ${chalk.magenta(this.known_for_department)}`);

  //   this.known_for.forEach((movie) => {
  //     if (movie.title !== "undefined") {
  //       log("\n");
  //       log(`\tMovie:`);
  //       log(`\tRelease date: ${chalk.white(movie.release_date)}`);
  //       log(`\tTitle: ${chalk.white(movie.title)}`);
  //       log("\n");
  //     } else {
  //       log(`\t${chalk.white(this.name)} doesn’t appear in any movie\n:`);
  //     }
  //   });

  //   log("\n");
  // }

  // renderPersonById() {
  //     log("____________________________________\nPerson:\n");
  //     log(`ID: ${this.id} \nName: ${chalk.cyanBright(this.name)} \nBirthday: ${this.birthday} ${chalk.gray("|")} ${this.place_of_birth}`);
  //     if (this.known_for_department != null) log(`Department: ${chalk.magentaBright(this.known_for_department)}`);

  //     log(`Biography: ${chalk.cyanBright(chalk.bold(this.biography))} \n`);

  //     if (this.also_known_as) {
  //         log(`Also known as: \n`);
  //         this.also_known_as.forEach(element => {
  //         log(element);
  //       });
  //     } else {
  //         log(`${chalk.yellow(this.name)} doesn’t have any alternate names`)
  //     }

  //     log("");
  // }
}

module.exports = Movie;
