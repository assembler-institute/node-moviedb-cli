const chalk = require("chalk");

function renderPersons(data) {
  if (data.total_pages > data.page) {
    console.log(chalk.white("\n"));
    console.log(chalk.white("-".repeat(100)));
    console.log(chalk.white("Page " + data.page + " of " + data.total_pages));
  }
  const persons = data.results;
  persons.map((person) => {
    console.log(chalk.white("\n"));
    console.log(chalk.white("-".repeat(100)));
    console.log(chalk.white("\n"));
    console.log(chalk.white("Person:"));
    console.log(chalk.white("\n"));
    console.log(chalk.white("ID: " + person.id));
    console.log(chalk.white("Name: ") + chalk.blue.bold(person.name));
    if (person.known_for_department === "Acting") {
      console.log(
        chalk.white("Department: ") + chalk.magenta(person.known_for_department)
      );
      console.log(chalk.white("\n"));
    }
    let definedMovies = 0;
    person.known_for.map((film) => {
      if (film.title !== undefined) {
        definedMovies += 1;
      }
    });
    if (definedMovies > 0) {
      console.log(chalk.white("Know for movies:"));
      console.log(chalk.white("\n"));
      person.known_for.map((movie) => {
        if (movie.title !== undefined) {
          console.log("\t" + chalk.white("Movie:"));
          console.log("\t" + chalk.white("ID: " + movie.id));
          console.log(
            "\t" + chalk.white("Release date: " + movie.release_date)
          );
          console.log("\t" + chalk.white("Title: " + movie.title));
          console.log(chalk.white("\n"));
        }
      });
    } else {
      console.log(
        chalk.yellow(person.name + " doesn’t appear in any movie \n")
      );
    }
  });
}

function renderMovies(data) {
  if (data.total_pages > data.page) {
    console.log(chalk.white("\n"));
    console.log(chalk.white("-".repeat(100)));
    console.log(chalk.white("Page " + data.page + " of " + data.total_pages));
  }
  const movies = data.results;
  movies.map((movie) => {
    console.log(chalk.white("-".repeat(100)));
    console.log(chalk.white("\n"));
    console.log(chalk.white("Movie:\n"));
    console.log(chalk.white("ID: " + movie.id));
    console.log(chalk.white("Title: ") + chalk.blue(movie.title));
    console.log(chalk.white("Release Date: " + movie.release_date + "\n"));
  });
}

exports.persons = renderPersons;
exports.movies = renderMovies;
