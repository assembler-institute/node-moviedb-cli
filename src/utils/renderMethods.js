const chalk = require("chalk");
const ora = require("ora");

const log = console.log;

function renderMovies(page, allPages, movies) {
  if (allPages > page) {
    log(chalk.white("\n\n--------------------------------"));
    log(`Page: ${chalk.bold(page)} of: ${chalk.white(allPages)}`);
    movies.forEach((movie) => {
      log(chalk.white("--------------------------------"));
      log("\n");
      log(chalk.bold("Movie: \n"));
      log(chalk.white(`ID: ${chalk.bold(`${movie.id}`)}`));
      log(chalk.white(`Title: ${chalk.bold(chalk.blue(`${movie.title}`))}`));
      log(chalk.white(`Release Date: ${chalk.bold(`${movie.release_date}`)}`));
    });
  }
}

//! This is the use for the spinner with ora.
function spinner(time) {
  // const spinner = ora("Loading content...").start();
  const spinner = ora({
    text: `${chalk.yellow("Fetching de movie data...")}`,
    spinner: "soccerHeader",
  });

  spinner.start();

  setTimeout(() => {
    spinner.succeed("Data received");
  }, time + 1000);
}
//! This is the execution of the spinner.
spinner(1000);

function renderSingleMovie(movie) {
  log(chalk.white("\n\n--------------------------------"));
  log(chalk.bold("Movie: \n"));
  log(chalk.white(`ID: ${chalk.bold(`${movie.id}`)}`));
  log(chalk.white(`Title: ${chalk.bold(chalk.blue(`${movie.title}`))}`));
  log(chalk.white(`Release Date: ${chalk.bold(`${movie.release_date}`)}`));
  log(chalk.white(`Runtime: ${chalk.bold(`${movie.runtime}`)}`));
  log(chalk.white(`Vote Count: ${chalk.bold(`${movie.vote_count}`)}`));
  log(chalk.white(`Overview: ${chalk.bold(`${movie.overview}`)} \n`));
  log(chalk.white(`Genres: \n`));
  if (movie.genres.length !== 0) {
    movie.genres.forEach((genre) => {
      log(chalk.white(`${chalk.bold(`· ${genre.name}`)}`));
    });
  } else {
    log(
      `${chalk.bold(chalk.yellow(`The movie doesn’t have a declared genre`))}`
    );
  }
  log(`\n`);
  log(chalk.white(`Spoken languages: \n`));
  if (movie.spoken_languages.length !== 0) {
    movie.spoken_languages.forEach((language) => {
      log(chalk.white(`${chalk.bold(`· ${language.name}`)}`));
    });
  } else {
    log(
      `${chalk.bold(
        chalk.yellow(
          `The movie: ${movie.id} doesn’t have any declared languages`
        )
      )}`
    );
  }
}

function renderReviews(movieId) {
  if (movieId.results.length !== 0) {
    if (movieId.total_pages >= movieId.page) {
      log(chalk.white("\n\n--------------------------------"));
      log(
        `Page: ${chalk.bold(movieId.page)} of: ${chalk.white(
          movieId.total_pages
        )}`
      );
      log(chalk.white("--------------------------------"));
      log("\n");
      log(chalk.white("Reviews: \n"));
      movieId.results.forEach((review) => {
        // Author of the review.
        log(chalk.white("Author: "));
        log(`${chalk.bold(`${chalk.blue(`${review.author}`)}`)} \n`);
        // Content of the review.
        log(chalk.white("Content: "));
        if (review.content.length > 400) {
          let shortContent = review.content.slice(0, 400) + "...";
          log(`${chalk.bold(`${shortContent}`)} \n`);
        } else {
          log(`${chalk.bold(`${review.content}`)} \n`);
        }
        log(chalk.white("--------------------------------"));
      });
    }
  } else {
    `The movie: ${movie.id} doesn’t have any reviews`;
  }
}

module.exports = {
  renderMovies: renderMovies,
  renderSingleMovie: renderSingleMovie,
  renderReviews: renderReviews,
};
