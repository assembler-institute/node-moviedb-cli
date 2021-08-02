// Imports
// ---------------------------------------------------
require("dotenv").config({ path: "../.env" });
const https = require("https");
const ora = require("ora");

// General variables
// ---------------------------------------------------
const apiKey = process.env.API_KEY;
const pageNum = 1;

// Request Function
// ---------------------------------------------------
function makeHTTPRequest(options, oraInit, oraSuccess, oraFailure, page) {
  // Creating ora spinner (oraInit --> initial spinner text)
  const spinner = ora(oraInit).start();
  spinner;

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding("utf8");
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      // Getting the request response and adding
      // ora spinner succed message and the page to it
      res.on("end", () => {
        resolve(JSON.parse(responseBody));
        spinner.succeed(oraSuccess + page);
        // console.log("This is the response ", responseBody);
      });
    });

    // Getting the request error and adding ora
    // spinner failure message and the page to it
    req.on("error", (err) => {
      reject(err);
      spinner.fail(oraFailure + page);
    });

    req.end();
  });
}

// Command Functions
// ---------------------------------------------------
function getPersons(page, key = apiKey) {
  const options = {
    hostname: "api.themoviedb.org",
    port: 443,
    path: `/3/person/popular?page=${page}&api_key=${key}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const spinner = ora("Fetching the popular person's data...").start();
  spinner;

  let finalResult = new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding("utf8");
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(responseBody));
        spinner.succeed(`Loaded popular persons at page ${page}`);
      });
    });

    req.on("error", (err) => {
      reject(err);
      spinner.fail(`Couldn't load popular persons at page ${page}`);
    });

    req.end();
  });

  return finalResult;
}

function getMovieById(movieId, key = apiKey) {
  const options = {
    hostname: "api.themoviedb.org",
    port: 443,
    path: `/3/movie/${movieId}?api_key=${key}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const spinner = ora("Fetching the requested movie data...").start();

  let finalResult = new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding("utf8");
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(responseBody));
        spinner.succeed(`Loaded requested movie with ID:  ${movieId}`);
      });
    });

    req.on("error", (err) => {
      reject(err);
      spinner.fail(`Couldn't load requested movie with ID: ${movieId}`);
    });

    req.end();
  });

  return finalResult;
}

function getPersonById(id, key = apiKey) {
  const options = {
    hostname: "api.themoviedb.org",
    port: 443,
    path: `/3/person/${id}?api_key=${key}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const spinner = ora("Fetching the person data...").start();
  spinner;

  let finalResult = new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding("utf8");
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(responseBody));
        // console.log("This is the response ", responseBody);
        spinner.succeed(`Loaded person with id ${id}`);
      });
    });

    req.on("error", (err) => {
      reject(err);
      spinner.fail(`Couldn't load person with id ${id}`);
    });

    req.end();
  });

  return finalResult;
}

function getReviews(movieId, page = 1, key = apiKey) {
  const options = {
    hostname: "api.themoviedb.org",
    port: 443,
    path: `/3/movie/${movieId}/reviews?page=${page}&api_key=${key}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const spinner = ora("Fetching the requested movie data...").start();
  spinner;

  let finalResult = new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding("utf8");
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(responseBody));
        // console.log("This is the response ", responseBody);
        spinner.succeed(`Loaded requested movie reviews.`);
      });
    });

    req.on("error", (err) => {
      reject(err);
      spinner.fail(`Couldn't load requested movie reviews`);
    });

    req.end();
  });

  return finalResult;
}

function getMovies(page, nowPlaying, key = apiKey) {
  // Initializing http request params
  let requestPath = "";
  let oraInit = "";
  let oraSuccess = "";
  let oraFailure = "";

  if (nowPlaying) {
    requestPath = `/3/movie/now_playing?page=${page}&api_key=${key}`;
    oraInit = "Fetching data of movies that are being played now";
    oraSuccess = "Loaded movies that are being played now at page ";
    oraFailure = "Couldn't load movies that are being played now at page ";
  } else {
    requestPath = `/3/movie/popular?page=${page}&api_key=${key}`;
    oraInit = "Fetching popular movies data";
    oraSuccess = "Loaded popular movies at page ";
    oraFailure = "Couldn't load popular movies at page ";
  }

  const options = {
    hostname: "api.themoviedb.org",
    port: 443,
    path: requestPath,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Making request
  return makeHTTPRequest(options, oraInit, oraSuccess, oraFailure, page);
}

// Exports
// ---------------------------------------------------
module.exports = {
  getPersons,
  getPersonById,
  getMovies,
  getMovieById,
  getReviews,
};
