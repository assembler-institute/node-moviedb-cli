const chalk = require("chalk");

const { SECTION_SEPARATOR } = require("../../utils/constants");

const spinner = require("../../components/spinner");

function printGetMovieInformation(dataObject) {
  if (dataObject.success == false) {
    spinner.fail(dataObject.status_message);
  } else {
    // Separator
    console.log(chalk.white(`${SECTION_SEPARATOR}\n`));

    // Title person
    console.log(chalk.white("Movie:\n"));

    // ID property
    console.log(chalk.white(`ID: ${dataObject.id}`));

    // Title property
    console.log(`Title: ${chalk.bold.blue(dataObject.title)}`);

    // Release Date property
    console.log(chalk.white(`Release Date: ${dataObject.release_date}`));

    // Runtime property
    console.log(chalk.white(`Runtime: ${dataObject.runtime}`));

    // Vote Count property
    console.log(chalk.white(`Vote Count: ${dataObject.vote_count}`));

    // Overview property
    console.log(chalk.white(`Overview: ${dataObject.overview}\n`));

    // Genres property
    if (dataObject.genres.length == 0) {
      console.log(chalk.yellow("The movie doesn’t have a declared genre"));
    } else {
      console.log("Genres:");
      dataObject.genres.forEach((genre) => {
        console.log(chalk.white(`\t${genre.name}`));
      });
    }

    // Empty line
    console.log("");

    // Spoke Languages property
    if (dataObject.spoken_languages.length == 0) {
      console.log(
        chalk.yellow(
          `The movie: ${dataObject.id} doesn’t have any declared languages`
        )
      );
    } else {
      console.log("Spoken Languages:");
      dataObject.spoken_languages.forEach((language) => {
        console.log(chalk.white(`\t${language.english_name}`));
      });
    }

    // Empty line
    console.log("");

    // Separator
    console.log(chalk.white(`${SECTION_SEPARATOR}\n\n\n`));

    // Operation succeed
    spinner.succeed("Movie data loaded");
  }
}

function printGetMovieReviewsInformation(dataObject) {
  if (dataObject.success == false) {
    spinner.fail(dataObject.status_message);
  } else {
    const results = dataObject.results;

    // Render Reviews
    if (results.length == 0) {
      console.log(
        chalk.yellow(`The movie: ${dataObject.id} doesn’t have any reviews\n\n`)
      );
    } else {
      // Separator
      console.log(chalk.white(`${SECTION_SEPARATOR}\n`));

      results.forEach((result) => {
        //Autor
        console.log("Autor: " + chalk.blue(result.author));

        //Content
        if (result.content.length > 400) {
          console.log(
            "Content: " + chalk.white(result.content.substring(0, 400) + "...")
          );
        } else {
          console.log(chalk.white("Content: " + result.content));
        }

        // empty line
        console.log("");
      });
    }

    // Separator
    console.log(chalk.white(`${SECTION_SEPARATOR}`));

    // Page index
    if (dataObject.page <= dataObject.total_pages) {
      console.log(
        chalk.white(
          `Page ${dataObject.page} of ${dataObject.total_pages}\n\n\n`
        )
      );
    }

    // Operation succeed
    spinner.succeed("Movie reviews data loaded");
  }
}

module.exports = {
  printGetMovieInformation: printGetMovieInformation,
  printGetMovieReviewsInformation: printGetMovieReviewsInformation,
};
