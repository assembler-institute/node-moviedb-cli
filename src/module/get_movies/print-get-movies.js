const spinner = require("../../components/spinner");
const chalk = require("chalk");
const { SECTION_SEPARATOR } = require("../../utils/constants");

function printGetMoviesInformation(dataObject) {
  if (dataObject.errors) {
    spinner.fail(dataObject.errors[0]);
  }
  const results = dataObject.results;
  console.log(dataObject);
  results.forEach((r) => {
    console.log(chalk.white("Movie:\n"));

    console.log(chalk.white(`ID: ${r.id}\t`));

    console.log(`Title: ${chalk.bold.blue(r.title)}\t`);

    console.log(chalk.white(`Release Date: ${r.release_date}\t`));

    console.log(SECTION_SEPARATOR);
  });
  if (dataObject.page <= dataObject.total_pages) {
    console.log(
      chalk.white(`Page ${dataObject.page} of ${dataObject.total_pages}\n`)
    );
  }
  spinner.stop();
  spinner.succeed("Popular movies loaded");
}
module.exports = { printGetMoviesInformation: printGetMoviesInformation };
