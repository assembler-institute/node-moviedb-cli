const chalk = require("chalk");

function renderPersons(data) {
  data.results.forEach((person) => {
    console.log(
      `PERSON: 
  
  ID: ${person.id}
  Name: ${chalk.bold.blue(person.name)}
  Departament: ${chalk.magenta(person.known_for_department)}\n\n`
    );

    person.known_for.forEach((movies) => {
      if (movies.original_title == undefined) {
        console.log(`${chalk.yellow.dim("There's no movive ")}`);
      } else {
        console.log(
          `\tMovie:
      \tID: ${chalk.green(movies.id)}
      \tRelease Date: ${chalk.green(movies.release_date)}
      \tTitle: ${chalk.green(movies.original_title)}`
        );
      }
    });

    console.log(
      `--------------------------------------------------------\n\n`
    );
  });
}

function renderPerson(data) {
  console.log(
    chalk.white(
      `\n-----------------------------------------------------------------`
    )
  );
  console.log(chalk.white("Person:\n"));
  console.log(chalk.white("ID: ", data.id));
  console.log("Name: ", chalk.blue(data.name));
  console.log(
    chalk.white("Birthday: ", data.birthday),
    chalk.gray("|"),
    chalk.white(data.place_of_birth)
  );
  if (data.known_for_department === "Acting") {
    console.log("Department: ", chalk.magenta(data.known_for_department));
  } else {
    console.log("");
  }
  console.log("Biography: ", chalk.bold.blue(data.biography));
  if (data.also_known_as) {
    console.log(`\n`);
    console.log(chalk.white("Also known as: \n"));
    data.also_known_as.map((name) => console.log(chalk.white(name)));
    console.log(`\n`);
  } else {
    console.log(`\n`);
    console.log(
      chalk.yellow(data.name),
      "doesn't have any alternate names\n"
    );
  }

}

function renderMovies(data, msg, spinner) {
  console.log(
    chalk.white(
      `\n-----------------------------------------------------------------`
    )
  );
  console.log("Page: ", chalk.white(data.page, " of ", data.total_pages));
  data.results.map((movie) => {
    console.log(
      chalk.white(
        `\n-----------------------------------------------------------------\n`
      )
    );
    console.log(chalk.white("Movie:\n"));
    console.log("ID: ", chalk.white(movie.id));
    console.log("Title: ", chalk.bold.blue(movie.title));
    console.log("Release Date: ", chalk.white(movie.release_date, "\n"));
  });
  spinner.succeed(msg);
}


module.exports = {
  renderPersons: renderPersons,
  renderPerson: renderPerson,
  renderMovies: renderMovies,
};
