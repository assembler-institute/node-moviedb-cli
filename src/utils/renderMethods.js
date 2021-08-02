const chalk = require("chalk");
const log = console.log;

function renderPersons(persons) {
  if (persons.total_pages > persons.page) {
    log(`${chalk.white(`\n\n----------------------------------------`)}`);
    log(`Page: ${persons.page} of: ${persons.total_pages}`);
  }
  persons.results.forEach((person) => {
    log(chalk.white(`----------------------------------------`));
    log(`\n`);
    log(`${chalk.white("Person: ")} \n`);
    log(`ID:${chalk.white(person.id)}`);
    log(`Name:${chalk.blue(person.name)}`);

    if (person.known_for_department === "Acting") {
      log(`Department:${chalk.magenta(person.known_for_department)}`);
    }
    let appearsInMovie = false;
    person.known_for.forEach((alias) => {
      if (alias.title !== undefined) {
        log(`\n`);
        log(`\t${chalk.white("Movie:")}`);
        log(`\t${chalk.white("ID: ")}${chalk.white(alias.id)}`);
        log(
          `\t${chalk.white("Release date: ")}${chalk.white(
            alias.realease_date
          )}`
        );
        log(`\t${chalk.white("Title: ")}${chalk.white(alias.title)}\n`);
        appearsInMovie = true;
      }
    });

    if (appearsInMovie === false) {
      log(`${chalk.white(`${person.name} doesn’t appear in any movie`)}\n`);
    }
  });
}

function renderPersonDetails(person) {
  if (person.success == false) throw "Id not found";
  log(chalk.white(`\n\n----------------------------------------`));
  log(`\n`);
  log(`${chalk.white("Person: ")} \n`);
  log(`ID:${chalk.white(person.id)}`);
  log(`Name:${chalk.blue(person.name)}`);
  log(
    `Birthday:${chalk.white(person.birthday)} ${chalk.gray("|")} ${chalk.white(
      person.place_of_birth
    )}`
  );
  log(`Biography:${chalk.blue.bold(person.biography)}`);

  if (person.known_for_department === "Acting") {
    log(`Department:${chalk.magenta(person.known_for_department)}`);
  }
  log(`\n`);
  log(`${chalk.white(`Also know as:`)} \n`);
  if (person.also_known_as.length > 0) {
    person.also_known_as.forEach((alias) => {
      log(`${chalk.white(alias)}`);
    });
  } else {
    log(`\n`);
    log(`${chalk.yellow(`${person.name} doesn’t have any alternate names`)}\n`);
  }
}

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
  renderPersons: renderPersons,
  renderPersonDetails: renderPersonDetails,
  renderMovies: renderMovies,
  renderSingleMovie: renderSingleMovie,
  renderReviews: renderReviews,
};
