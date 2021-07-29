const chalk = require("chalk");

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

module.exports = {
  renderMovies: renderMovies,
};
