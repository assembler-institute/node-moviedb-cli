const https = require("https");

const {
  API_KEY,
  API_HOSTNAME,
  API_TIMEOUT_REQUEST,
} = require("../../utils/constants");

const spinner = require("../../components/spinner");

// Functions to print or save the data
const {
  printGetMovieInformation,
  printGetMovieReviewsInformation,
} = require("./print-get-movie");
const { saveGetMovieData } = require("./get-movie-data-local-handle");

function getMovieRequest({ id, save }) {
  const options = {
    hostname: API_HOSTNAME,
    port: 443,
    path: `/3/movie/${id}?api_key=${API_KEY}`,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    let dataText = "";

    res.on("data", (d) => {
      dataText += d;

      spinner.start("Fetching the movie data...\n\n");
    });

    res.on("end", () => {
      // This timeout is to show the loading data spinner
      setTimeout(() => {
        const dataObject = JSON.parse(dataText);

        if (save) {
          saveGetMovieData(dataText);
        } else {
          printGetMovieInformation(dataObject);
        }
      }, API_TIMEOUT_REQUEST);
    });
  });

  req.on("error", (e) => {
    spinner.fail(`Error "${e.code}" (Code ${e.errno})`);
  });

  req.end();
}

function getMovieReviewsRequest({ id, save }) {
  const options = {
    hostname: API_HOSTNAME,
    port: 443,
    path: `/3/movie/${id}/reviews?api_key=${API_KEY}`,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    let dataText = "";

    res.on("data", (d) => {
      dataText += d;

      spinner.start("Fetching the movie data...\n\n");
    });

    res.on("end", () => {
      // This timeout is to show the loading data spinner
      setTimeout(() => {
        const dataObject = JSON.parse(dataText);

        if (save) {
          saveGetMovieData(dataText, true);
        } else {
          printGetMovieReviewsInformation(dataObject);
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
  getMovieRequest: getMovieRequest,
  getMovieReviewsRequest: getMovieReviewsRequest,
};
