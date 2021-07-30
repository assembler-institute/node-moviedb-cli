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
        // console.log("This is the response ", responseBody);
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

function getMovies(page, key = apiKey) {
  // Initializing http request params
  const options = {
    hostname: "api.themoviedb.org",
    port: 443,
    path: `/3/movie/popular?page=${page}&api_key=${key}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const oraInit = "Fetching movie data...";
  const oraSuccess = "Loaded popular movies at page ";
  const oraFailure = "Couldn't load popular movies at page ";

  // Making request
  return makeHTTPRequest(options, oraInit, oraSuccess, oraFailure, page);
}

// Exports
// ---------------------------------------------------
module.exports = { getPersons, getMovies };
