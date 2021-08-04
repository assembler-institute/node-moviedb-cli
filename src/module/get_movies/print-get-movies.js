const chalk = require("chalk");

const { SECTION_SEPARATOR } = require("../../utils/constants");

const spinner = require("../../components/spinner");

function printGetMoviesInformation(dataObject, nowPlaying = false) {
  if (nowPlaying && dataObject.page < 0) {
    spinner.fail("page must be greater than 0");
  } else if (nowPlaying && dataObject.page > dataObject.total_pages) {
    spinner.fail(
      `page must be less than or equal to ${dataObject.total_pages}`
    );
  } else {
    if (dataObject.errors) {
      spinner.fail(dataObject.errors[0]);
    } else {
      const results = dataObject.results;
      results.forEach((r) => {
        // Separator
        console.log(chalk.white(`${SECTION_SEPARATOR}\n`));

        // Movie title
        console.log(chalk.white("Movie:\n"));

        // ID Property
        console.log(chalk.white(`ID: ${r.id}`));

        // Title property
        console.log(`Title: ${chalk.bold.blue(r.title)}`);

        // Release_date property
        console.log(chalk.white(`Release Date: ${r.release_date}\n`));
      });

      // Page index
      if (dataObject.page <= dataObject.total_pages) {
        console.log(chalk.white(SECTION_SEPARATOR));
        console.log(
          chalk.white(
            `Page ${dataObject.page} of ${dataObject.total_pages}\n\n\n`
          )
        );
      }

      // Operation succeed
      if (nowPlaying) {
        spinner.succeed("Movies playing now data loaded");
      } else {
        spinner.succeed("Popular movies loaded");
      }
    }
  }
}

module.exports = {
  printGetMoviesInformation: printGetMoviesInformation,
};
