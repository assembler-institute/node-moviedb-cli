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

// Exports
// ---------------------------------------------------
module.exports = { getPersons, getPersonById };
