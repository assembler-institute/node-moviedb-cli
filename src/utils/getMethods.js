const https = require("https");
const ora = require("ora");

const httpConstants = require("./httpConstants.js");
const { chalkPeople, chalkPersonId } = require("./chalks.js");

/**
 * get People by Pages
 * @param page: number of page to render
 */
function PersonsByPage(page = 1) {
  const options = {
    ...httpConstants,
    path: `/3/person/popular?page=${page}&api_key=${process.env.API_KEY}`,
  };

  const spinner = ora("Loading popular people").start();

  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => chalkPeople(JSON.parse(body), spinner));
  });

  req.on("error", (e) => spinner.fail(e.message));
  req.end();
}

/**
 * Person by ID functions
 */
function PersonById(id) {
  const options = {
    ...httpConstants,
    path: `/3/person/${id}?&api_key=${process.env.API_KEY}`,
  };

  const spinner = ora("Fetching the person data...\n").start();

  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => chalkPersonId(JSON.parse(body), spinner));
  });

  req.on("error", (e) => spinner.fail(e.message));
  req.end();
}

module.exports = { PersonById, PersonsByPage };
