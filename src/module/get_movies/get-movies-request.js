const https = require("https");

const {
  API_KEY,
  API_HOSTNAME,
  API_TIMEOUT_REQUEST,
} = require("../../utils/constants");

const spinner = require("../../components/spinner");

// Functions to print or save the data
const { printGetMoviesInformation } = require("./print-get-movies");
const { saveGetMoviesData } = require("./get-movies-data-local-handle");

function getMoviesRequest({ page, save }) {
  const options = {
    hostname: API_HOSTNAME,
    port: 443,
    path: `/3/movie/popular?page=${page}&api_key=${API_KEY}`,
    method: "GET",
  };
  const req = https.request(options, (res) => {
    let dataText = "";

    res.on("data", (d) => {
      dataText += d;

      spinner.start("Fetching the movies data...\n\n");
    });

    res.on("end", () => {
      // This timeout is to show the loading data spinner
      setTimeout(() => {
        const dataObject = JSON.parse(dataText);

        if (save) {
          saveGetMoviesData(dataText);
        } else {
          printGetMoviesInformation(dataObject);
        }
      }, API_TIMEOUT_REQUEST);
    });
  });

  req.on("error", (e) => {
    spinner.fail(`Error "${e.code}" (Code ${e.errno})`);
  });

  req.end();
}

function getMoviesNowPlayingRequest({ page, save }) {
  const options = {
    hostname: API_HOSTNAME,
    port: 443,
    path: `/3/movie/now_playing?page=${page}&api_key=${API_KEY}`,
    method: "GET",
  };
  const req = https.request(options, (res) => {
    let dataText = "";

    res.on("data", (d) => {
      dataText += d;

      spinner.start("Fetching the movies data...\n\n");
    });

    res.on("end", () => {
      // This timeout is to show the loading data spinner
      setTimeout(() => {
        const dataObject = JSON.parse(dataText);

        if (save) {
          saveGetMoviesData(dataText, true);
        } else {
          printGetMoviesInformation(dataObject, true);
        }
      }, API_TIMEOUT_REQUEST);
    });
  });

  req.on("error", (e) => {
    spinner.fail(`Error "${e.code}" (Code ${e.errno})`);
  });

  req.end();
}

module.exports = {
  getMoviesRequest: getMoviesRequest,
  getMoviesNowPlayingRequest: getMoviesNowPlayingRequest,
};
