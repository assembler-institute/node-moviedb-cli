const chalk = require("chalk");
const https = require("https");
const spinner = require("../../components/spinner");
const separator = "--------------------------------------";

const {
  API_KEY,
  API_HOSTNAME,
  API_TIMEOUT_REQUEST,
} = require("../../utils/constants");

function getMovies({ page }) {
  const options = {
    hostname: API_HOSTNAME,
    port: 443,
    path: `/3/movie/popular?page=${page}&api_key=${API_KEY}`,
    method: "GET",
  };
  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (d) => {
      body += d;

      spinner.color = "red";
      spinner.start("Fetching the movies data...\t");
    });

    res.on("end", () => {
      setTimeout(() => {
        // This timeout is to show the loading data spinner
        const dataObject = JSON.parse(body);

        if (dataObject.errors) {
          spinner.fail(dataObject.errors[0]);
        }
        const results = dataObject.results;

        results.forEach((r) => {
          console.log(chalk.white("Movie:\n"));

          console.log(chalk.white(`ID: ${r.id}\t`));

          console.log(`Title: ${chalk.bold.blue(r.title)}\t`);

          console.log(chalk.white(`Release Date: ${r.release_date}\t`));

          console.log(separator);
        });
        if (page <= dataObject.total_pages) {
          console.log(
            chalk.white(`Page ${page} of ${dataObject.total_pages}\n`)
          );
        }
        spinner.stop();
        spinner.succeed("Popular movies loaded");
      }, API_TIMEOUT_REQUEST);
    });
  });

  req.on("error", (e) => {
    spinner.fail(`Error number:${e.errno} => code:${e.code}`);
  });

  req.end();
}

function getMoviesNowPlaying({ page }) {
  const options = {
    hostname: API_HOSTNAME,
    port: 443,
    path: `/3/movie/now_playing?page=${page}&api_key=${API_KEY}`,
    method: "GET",
  };
  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (d) => {
      body += d;

      spinner.color = "red";
      spinner.start("Fetching the movies data...\n");
    });

    res.on("end", () => {
      setTimeout(() => {
        // This timeout is to show the loading data spinner
        const dataObject = JSON.parse(body);

        if (dataObject.errors) {
          spinner.fail(dataObject.errors[0]);
        }
        const results = dataObject.results;

        results.forEach((r) => {
          console.log(chalk.white("Movie:\n"));

          console.log(chalk.white(`ID: ${r.id}\t`));

          console.log(`Title: ${chalk.bold.blue(r.title)}\t`);

          console.log(chalk.white(`Release Date: ${r.release_date}\t`));

          console.log(separator);
        });
        if (page <= dataObject.total_pages) {
          console.log(
            chalk.white(`Page ${page} of ${dataObject.total_pages}\n`)
          );
        }
        spinner.stop();
        spinner.succeed("Movies playing now data loaded");
      }, API_TIMEOUT_REQUEST);
    });
  });

  req.on("error", (e) => {
    spinner.fail(`Error number:${e.errno} => code:${e.code}`);
  });

  req.end();
}

module.exports = {
  getMovies: getMovies,
  getMoviesNowPlaying: getMoviesNowPlaying,
};
