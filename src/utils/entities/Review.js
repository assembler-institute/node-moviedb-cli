const chalk = require("chalk");
const log = console.log;

class Review {
  constructor(movie) {
    this.id = movie.id;
    this.reviews = movie.results;
  }

  renderMovieReviews() {
    log(chalk.white("\n_________________________"));
    log("\n");

    if (this.reviews.length)
      this.reviews.map((review) => {
        log(`Author: ${chalk.blue.bold(review.author)}`);
        log(`content: ${chalk.white(this.sliceString(review.content))}`);
      });
    else log(`The movie: ${this.id} doesn’t have any reviews`);

    log("\n");
  }

  sliceString(text = "", max = 400) {
    if (text.length > max) {
      return text.slice(0, max) + "...";
    }
  }
}

module.exports = Review;
