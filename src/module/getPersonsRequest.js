const https = require("https");
const chalk = require("chalk");
require("dotenv").config();

const spinner = require("../components/spinner");
const API_KEY = process.env.API_KEY;
const separator = "--------------------------------------";

function getPersons({ page }) {
  const options = {
    hostname: "api.themoviedb.org",
    port: 443,
    path: `/3/person/popular?page=${page}&api_key=${API_KEY}`,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (d) => {
      body += d;

      spinner.color = "red";
      spinner.start("Loading data...");
    });

    res.on("end", () => {
      // This timeout is to show the loading data spinner
      setTimeout(() => {
        const dataObject = JSON.parse(body);

        if (dataObject.errors) {
          spinner.fail(dataObject.errors[0]);
        }

        const results = dataObject.results;
        results.forEach((r) => {
          // Title person
          console.log(chalk.white("Person:\n"));

          // ID property
          console.log(chalk.white(`ID: ${r.id}\t`));

          // Name property
          console.log(`Name: ${chalk.bold.blue(r.name)}`);

          // known_for_department property
          if (r.known_for_department == "Acting") {
            console.log(
              `Department: ${chalk.magenta(r.known_for_department)}\n`
            );
          }

          // Appearing in movies section
          let cnt = 0;
          r.known_for.forEach((movie) => {
            if (movie.title) {
              if (cnt == 0) {
                console.log("Appearing in movies:\n");
              }
              console.log(chalk.white(`\tMovie:\t`));
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

          // Separator for each person
          console.log(`${separator}\n`);
        });

        if (page <= dataObject.total_pages) {
          console.log(
            chalk.white(`Page ${page} of ${dataObject.total_pages}\n`)
          );
        }

        spinner.stop();
        spinner.succeed("Popular Persons data loaded");
      }, 1000);
    });
  });

  req.on("error", (e) => {
    spinner.fail(`Error number:${e.errno} => code:${e.code}`);
  });

  req.end();
}

module.exports = { getPersons: getPersons };
