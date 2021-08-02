const https = require("https");
const chalk = require("chalk");

const {
  API_KEY,
  API_HOSTNAME,
  API_TIMEOUT_REQUEST,
  SECTION_SEPARATOR,
} = require("../utils/constants");

const spinner = require("../components/spinner");

function getMovie({ id }) {
  const options = {
    hostname: API_HOSTNAME,
    port: 443,
    path: `/3/movie/${id}?api_key=${API_KEY}`,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (d) => {
      body += d;

      spinner.start("Fetching the movie data...\n\n");
    });

    res.on("end", () => {
      // This timeout is to show the loading data spinner
      setTimeout(() => {
        const dataObject = JSON.parse(body);

        if (dataObject.success == false) {
          spinner.fail(dataObject.status_message);
        } else {
          // Separator
          console.log(chalk.white(`${SECTION_SEPARATOR}\n`));

          // Title person
          console.log(chalk.white("Movie:\n"));
          // ID property
          console.log(chalk.white(`ID: ${dataObject.id}`));

          // Name property
          console.log(`Tittle: ${chalk.bold.blue(dataObject.title)}`);
          // Release Date property
          console.log(chalk.white(`Release Date: ${dataObject.release_date}`));
          // Runtime property
          console.log(chalk.white(`Runtime: ${dataObject.runtime}`));
          // Vote Count property
          console.log(chalk.white(`Vote Count: ${dataObject.vote_count}`));
          // Overview property
          console.log(chalk.white(`Overviews: ${dataObject.overview}`));
          // empty line
          console.log(chalk.white(`\n`));
          // Genres property
          if (dataObject.genres.length == 0) {
            console.log(
              chalk.yellow("The movie doesn’t have a declared genre")
            );
          } else {
            console.log("Genres:");
            dataObject.genres.forEach((genre) => {
              console.log(chalk.white(` ${genre.name}`));
            });
          }
          // empty line
          console.log(chalk.white(`\n`));
          // Spoke Languages property
          if (dataObject.spoken_languages.length == 0) {
            console.log(
              chalk.yellow(
                `The movie: ${movie.id} doesn’t have any declared languages`
              )
            );
          } else {
            console.log("Spoken Languages:");
            dataObject.spoken_languages.forEach((language) => {
              console.log(chalk.white(` ${language.english_name}`));
            });
          }
          spinner.stop();
          spinner.succeed("Movie data loaded");
        }
      }, API_TIMEOUT_REQUEST);
    });
  });

  req.on("error", (e) => {
    spinner.fail(`Error "${e.code}" (Code ${e.errno})`);
  });

  req.end();
}
function getMovieReviews({ id }) {
  const options = {
    hostname: API_HOSTNAME,
    port: 443,
    path: `/3/movie/${id}/reviews?api_key=${API_KEY}`,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (d) => {
      body += d;

      spinner.start("Fetching the movie data...\n\n");
    });

    res.on("end", () => {
      // This timeout is to show the loading data spinner
      setTimeout(() => {
        const dataObject = JSON.parse(body);
        if (dataObject.success == false) {
          spinner.fail(dataObject.status_message);
        } else {
          const results = dataObject.results;
          // Separator
          console.log(chalk.white(`${SECTION_SEPARATOR}\n`));
          // Total page
          console.log(chalk.white(`Total Page: ${dataObject.total_pages}`));
          // Render Reviews
          if (results.length == 0) {
            console.log(
              chalk.yellow(
                `The movie: ${dataObject.id} doesn’t have any reviews\n\n`
              )
            );
          } else {
            results.forEach((result) => {
              //Autor
              console.log(chalk.blue(`${result.author}`));
              //Content
              if (result.content.length > 400) {
                console.log(
                  chalk.white(` ${result.content.substring(0, 400) + "..."}`)
                );
              } else {
                console.log(chalk.white(` ${result.content}`));
              }
              // empty line
              console.log(chalk.white(`\n`));
              //Autor
              console.log(chalk.white(` ${result.name}`));
            });
          }
          spinner.stop();
          spinner.succeed("Movie reviews data loaded");
        }
      }, API_TIMEOUT_REQUEST);
    });
  });

  req.on("error", (e) => {
    spinner.fail(`Error "${e.code}" (Code ${e.errno})`);
  });

  req.end();
}
module.exports = { getMovie, getMovieReviews };
