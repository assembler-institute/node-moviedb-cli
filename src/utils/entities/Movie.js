/** @format */

const chalk = require("chalk");
const log = console.log;

class Movie {
  constructor(movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.release_date = movie.release_date;
  }

  renderPopular() {
    log("\n");
    log("Movie: \n");
    log(`ID: ${chalk.white(this.id)}`);
    log(`Title: ${chalk.blue.bold(this.title)}`);
    log(`Release Date: ${chalk.white.bold(this.release_date)}`);

    // this.known_for.forEach((movie) => {
    //   if (movie.title !== "undefined") {
    //     log("\n");
    //     log(`\tMovie:`);
    //     log(`\tRelease date: ${chalk.white(movie.release_date)}`);
    //     log(`\tTitle: ${chalk.white(movie.title)}`);
    //     log("\n");
    //   } else {
    //     log(`\t${chalk.white(this.name)} doesn’t appear in any movie\n:`);
    //   }
    // });

    log("\n");
  }
}

module.exports = Movie;
