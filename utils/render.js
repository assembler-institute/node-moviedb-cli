const chalk = require("chalk");
const { options } = require("node-notifier");

const log = console.log;

function renderPersonsData(page, totalPages, persons) {
  if (totalPages > page) {
    log(chalk.white(`\n\n----------------------------------------`));
    log(chalk.white(`page: ${page} of: ${totalPages}`));

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

function renderMoviesData(page, totalPages, movies){
  log(chalk.white(`\n----------------------------------------`));
  log(chalk.white(`page: ${page} of: ${totalPages}`));

  movies.forEach((movie) => {
    log(chalk.white(`----------------------------------------`));
    log(`\n`);
    log(`${chalk.white(`Movie:\n`)}`);
    log(`ID: ${chalk.white.bold(movie.id)}`);
    log(`Title: ${chalk.blue.bold(movie.title)}`);
    log(`Release Date: ${chalk.white.bold(movie.release_date)}`);
}
)}

function renderMovieData(movie){
  
  log(chalk.white(`\n----------------------------------------`));
  log(`\n Movie: \n`);
  log(`ID: ${movie.id} \n `);
  log(`Title: ${chalk.blue.bold(movie.title)} \n`);
  log(`Release Date: ${movie.release_date} \n`);
  log(`Runtime: ${movie.runtime} \n`);
  log(`Vote Count: ${movie.vote_count} \n`);
  log(`Overview: ${movie.overview} \n`);
  log(`\n`);
    if (movie.genres){
      log(`Genres:`)
        movie.genres.forEach((genre)=>{
          log(`\n ${genre.name}`)
        })
    }
    else {
      log(chalk.yellow("The movie doesn’t have a declared genre \n"))
    }
  log(`\n`);
    if (movie.spoken_languages){
      log(`Spoken Languages:`)
        movie.spoken_languages.forEach((languages)=>{
          log(`\n ${languages.english_name}`)
        })
    }
    else {
      log(chalk.yellow(`The movie: ${movie.id} doesn’t have any declared languages \n`))
    }
}

module.exports = {
  renderPersonsData: renderPersonsData,
  renderPersonData: renderPersonData,
  renderMoviesData: renderMoviesData,
  renderMovieData: renderMovieData
};
