const https = require("https");
const chalk = require("chalk");

const {
  API_KEY,
  API_HOSTNAME,
  API_TIMEOUT_REQUEST,
  SECTION_SEPARATOR,
} = require("../utils/constants");

const spinner = require("../components/spinner");

function getPersons({ page }) {
  const options = {
    hostname: API_HOSTNAME,
    port: 443,
    path: `/3/person/popular?page=${page}&api_key=${API_KEY}`,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (d) => {
      body += d;

      spinner.start("Fetching the popular person's data...\n\n");
    });

    res.on("end", () => {
      // This timeout is to show the loading data spinner
      setTimeout(() => {
        const dataObject = JSON.parse(body);

        if (dataObject.errors) {
          spinner.fail(dataObject.errors[0]);
        } else {
          const results = dataObject.results;
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
              console.log(
                `Department: ${chalk.magenta(r.known_for_department)}`
              );
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
                console.log(
                  chalk.white(`\tRelease date: ${movie.release_date}`)
                );
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
          if (page <= dataObject.total_pages) {
            console.log(chalk.white(SECTION_SEPARATOR));
            console.log(
              chalk.white(`Page ${page} of ${dataObject.total_pages}\n\n\n`)
            );
          }

          spinner.stop();
          spinner.succeed("Popular Persons data loaded");
        }
      }, API_TIMEOUT_REQUEST);
    });
  });

  req.on("error", (e) => {
    spinner.fail(`Error "${e.code}" (Code ${e.errno})`);
  });

  req.end();
}

module.exports = { getPersons: getPersons };
