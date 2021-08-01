// Imports
// ---------------------------------------------------
require("dotenv").config({ path: "../.env" });
const https = require("https");
const ora = require("ora");

// General variables
// ---------------------------------------------------
const apiKey = process.env.API_KEY;
const pageNum = 1;

// Functions
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

function getMovie(movieId, key = apiKey) {
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

// Exports
// ---------------------------------------------------
module.exports = { getPersons, getMovie };
// module.exports = { getMovie };
