/** @format */

const https = require("https");
const ora = require("ora");

const httpConstants = require("./httpConstants.js");
const { chalkMovie, chalkPeople, chalkPersonId } = require("./chalks.js");

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
 * Movies functions - Movies Pagination
 * @param page: number of page to render
 * @param nowPlaying: bool, manage change of path
 * */
function MoviesByPage(page = 1, nowPlaying) {
  let path = `/3/movie/popular?page=${page}&api_key=${process.env.API_KEY}`;

  if (nowPlaying) {
    path = `/3/movie/now_playing?page=${page}&api_key=${process.env.API_KEY}`;
  }

  const options = {
    ...httpConstants,
    path: path,
  };
  const spinner = ora("Loading popular movie").start();

  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => chalkMovie(JSON.parse(body), spinner, nowPlaying));
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

module.exports = { PersonById, PersonsByPage, MoviesByPage };
