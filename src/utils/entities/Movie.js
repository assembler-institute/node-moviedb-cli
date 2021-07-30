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

    log("\n");
  }
}

module.exports = Movie;
