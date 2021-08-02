const chalk = require("chalk");

const { SECTION_SEPARATOR } = require("../../utils/constants");

const spinner = require("../../components/spinner");

function printGetPersonsInformation(data) {
  if (data.errors) {
    spinner.fail(data.errors[0]);
  } else {
    const results = data.results;
    results.forEach((r) => {
      // Separator
      console.log(chalk.white(`${SECTION_SEPARATOR}\n`));

      // Title person
      console.log(chalk.white("Person:\n"));

      // ID property
      console.log(chalk.white(`ID: ${r.id}`));

      // Name property
      console.log(`Name: ${chalk.bold.blue(r.name)}`);

      // known_for_department property
      if (r.known_for_department == "Acting") {
        console.log(`Department: ${chalk.magenta(r.known_for_department)}`);
      }

      // Empty line
      console.log("");

      // Appearing in movies section
      let cnt = 0;
      r.known_for.forEach((movie) => {
        if (movie.title) {
          if (cnt == 0) {
            console.log(chalk.white("Appearing in movies:\n"));
          }
          console.log(chalk.white(`\tMovie:`));
          console.log(chalk.white(`\tID: ${movie.id}`));
          console.log(chalk.white(`\tRelease date: ${movie.release_date}`));
          console.log(chalk.white(`\tTitle: ${movie.title}\n`));
          cnt += 1;
        }
      });
      if (cnt == 0) {
        console.log(
          chalk.hex("#FFA500")(`${r.name} doesn’t appear in any movie\n`)
        );
      }
    });

    // Page index
    if (data.page <= data.total_pages) {
      console.log(chalk.white(SECTION_SEPARATOR));
      console.log(
        chalk.white(`Page ${data.page} of ${data.total_pages}\n\n\n`)
      );
    }

    // Operation succeed
    spinner.succeed("Popular Persons data loaded");
  }
}

module.exports = {
  printGetPersonsInformation: printGetPersonsInformation,
};
