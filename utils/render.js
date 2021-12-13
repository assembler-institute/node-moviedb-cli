const chalk = require("chalk");

const log = console.log;

function renderPersonsData(page, totalPages, persons) {
  if (totalPages > page) {
    log(chalk.white(`\n\n----------------------------------------`));

  }

  persons.forEach((person) => {
    log(chalk.white(`----------------------------------------`));
    log(`\n`);
    log(`${chalk.white(`Person:\n`)}`);
    log(`ID: ${chalk.white(person.id)}`);
    log(`Name: ${chalk.blue.bold(person.name)}`);

    if (person.known_for_department === "Acting") {
      log(`Department: ${chalk.magenta(person.known_for_department)}`);
    }

    const hasAnyMovieWIthTitle = person.known_for.some(function knownForMovie(
      movie
    ) {
      return movie.title !== undefined;
    });

    if (hasAnyMovieWIthTitle) {
      log(chalk.white(`\nAppearing in movies:`));

      person.known_for.forEach(function knownFor(movie) {
        if (movie.title) {
          log(`\n`);
          log(`\t${chalk.white(`Movie:`)}`);
          log(`\tID: ${chalk.white(movie.id)}`);
          log(`\tRelease Date: ${chalk.white(movie.release_date)}`);
          log(`\tTitle: ${chalk.white(movie.title)}`);
          log(`\n`);
        }
      });
    } else {
      log(`\n`);
      log(chalk.yellow(`${person.name} doesn’t appear in any movie\n`));
    }
  });
}

function renderPersonData(person) {
  log(chalk.white(`\n----------------------------------------`));
  log(`${chalk.white(`Person:\n`)}`);
  log(`ID: ${chalk.white(person.id)}`);
  log(`Name: ${chalk.blue.bold(person.name)}`);
  log(
    `Birthday: ${chalk.white(person.birthday)} ${chalk.gray("|")} ${chalk.white(
      person.place_of_birth
    )}`
  );

  if (person.known_for_department === "Acting") {
    log(`Department: ${chalk.magenta(person.known_for_department)}`);
  }

  log(`Biography: ${chalk.blue.bold(person.biography)}`);

  if (person.also_known_as.length > 0) {
    log(`\n`);
    log(`${chalk.white(`Also known as:\n`)}`);

    person.also_known_as.forEach(function personAKA(alias) {
      log(chalk.white(alias));
    });
  } else {
    log(`\n`);
    log(chalk.yellow(`${person.name} doesn’t have any alternate names\n`));
  }
}

function renderMoviesData(){
  log(chalk.white(`\n----------------------------------------`));
  log(`${chalk.white(`Person:\n`)}`);
}

// function renderMovieData(){

// }

module.exports = {
  renderPersonsData: renderPersonsData,
  renderPersonData: renderPersonData,
  // renderMoviesData: renderMoviesData,
  // renderMovieData: renderMovieData
};
