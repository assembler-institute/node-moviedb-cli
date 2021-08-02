const chalk = require("chalk");
const log = console.log;

class Review {
  constructor(movie) {
    this.id = movie.id;
    this.page = movie.page;
    this.total_pages = movie.total_pages;
    this.reviews = movie.results;
  }

  renderMovieReviews() {
    log(chalk.white("\n_________________________"));
    log("\n");

    if (this.reviews.length) {
      this.reviews.map((review) => {
        log(`Author: ${chalk.blue.bold(review.author)}`);
        log(`content: ${chalk.white(this.sliceString(review.content))}`);
      });

      log(chalk.white("________________________________________________"));
      log(chalk.white(`Page: ${this.page} of: ${this.total_pages}`));
    } else log(`The movie: ${this.id} doesn’t have any reviews`);

    log("\n");
  }

  sliceString(text = "", max = 400) {
    if (text.length > max) {
      return text.slice(0, max) + "...";
    }
  }
}

module.exports = Review;
