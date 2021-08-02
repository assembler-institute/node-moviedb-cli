const chalk = require("chalk");
const log = console.log;

class Movie {
  constructor(movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.release_date = movie.release_date;
    this.release_date = movie.release_date;
    this.runtime = movie.runtime;
    this.vote_count = movie.vote_count;
    this.overview = movie.overview;
    this.genres = movie.genres;
    this.spoken_languages = movie.spoken_languages;
  }

  renderPopular() {
    log("\n");
    log("Movie: \n");
    log(`ID: ${chalk.white(this.id)}`);
    log(`Title: ${chalk.blue.bold(this.title)}`);
    log(`Release Date: ${chalk.white.bold(this.release_date)}`);

    log("\n");
  }

  renderSingleMovie() {
    log(chalk.white("\n_________________________"));
    log("\n");

    log("Movie: \n");
    log(`ID: ${chalk.white(this.id)}`);
    log(`Title: ${chalk.blue.bold(this.title)}`);
    log(`Release Date: ${chalk.white(this.release_date)}`);

    log(`Runtime: ${chalk.white(this.runtime)}`);
    log(`Vote Count: ${chalk.white(this.vote_count)}`);
    log(`Overview: ${chalk.white(this.overview)}`);
    log("\n");

    log(`Genres:\n`);
    if (this.genres.length)
      this.genres.map((genre) => log(chalk.white(`\t${genre.name}`)));
    else log("The movie doesn’t have a declared genre");
    log("\n");

    log(`Spoken languages:\n`);
    if (this.spoken_languages.length)
      this.spoken_languages.map((lang) => log(chalk.white(`\t${lang.name}`)));
    else log(`The movie: ${movie.id} doesn’t have any declared languages`);
    log("\n");
  }

  renderMovieReviews() {
    log(chalk.white("\n_________________________"));
    log("\n");

    if (this.spoken_languages.length)
      this.spoken_languages.map((lang) => log(chalk.white(`\t${lang.name}`)));
    else log(`The movie: ${movie.id} doesn’t have any declared languages`);

    log(`Author: ${chalk.blue.bold(this.author)}`);
    log(`content: ${chalk.white(this.content)}`);
  }
}

module.exports = Movie;
