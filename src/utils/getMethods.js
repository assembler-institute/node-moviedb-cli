/** @format */

const https = require("https");
const ora = require("ora");
const fs = require("fs");
const notifier = require("node-notifier");
const file = require("./fileReader.js");

const httpConstants = require("./httpConstants.js");
const {
  chalkMovie,
  chalkPeople,
  chalkPersonId,
  chalkSingleMovie,
} = require("./chalks.js");
/**
 * get People by Pages
 * @param page: number of page to render
 * @param option: save option
 */
function PersonsByPage(page = 1, option) {
  const options = {
    ...httpConstants,
    path: `/3/person/popular?page=${page}&api_key=${process.env.API_KEY}`,
  };

  const spinner = ora("Loading popular people").start();
  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => {
      if (option) {
        file.savePeople(JSON.parse(body));
        spinner.succeed("Popular Persons - Loaded");
        notifier.notify({
          title: "Popular Persons",
          message: "Popular Persons data loaded",
        });
      } else {
        chalkPeople(JSON.parse(body), spinner);
      }
    });
  });

  req.on("error", (e) => spinner.fail(e.message));
  req.end();
}

/**
 * Person by ID functions
 * @param id: id of the person
 */
function PersonById(id) {
  const options = {
    ...httpConstants,
    path: `/3/person/${id}?&api_key=${process.env.API_KEY}`,
  };

  const spinner = ora("Fetching the person data...\n").start();
  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => chalkPersonId(JSON.parse(body), spinner));
  });

  req.on("error", (e) => spinner.fail(e.message));
  req.end();
}

/**
 * Movies functions - Movies Pagination
 * @param page: number of page to render
 * @param nowPlaying: bool, movies that are playing npw
 * @param option: bool, save option
 * */
function MoviesByPage(page = 1, nowPlaying, option) {
  let path = `/3/movie/popular?page=${page}&api_key=${process.env.API_KEY}`;

  if (nowPlaying) {
    path = `/3/movie/now_playing?page=${page}&api_key=${process.env.API_KEY}`;
  }

  const options = {
    ...httpConstants,
    path: path,
  };

  const spinner = ora("Loading popular movies").start();

  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => {
      if (option) {
        file.saveMovies(JSON.parse(body), nowPlaying);
        spinner.succeed("Now playing movies data loaded");
        notifier.notify({
          title: "Popular Movies - Loaded",
          message: "Now playing movies data loaded",
        });
      } else {
        chalkMovie(JSON.parse(body), spinner, nowPlaying);
      }
    });
  });

  req.on("error", (e) => spinner.fail(e.message));
  req.end();
}

/**
 * Movies functions - Movies Pagination
 * @param id: id of movie
 * @param reviews: user reviews for a movie.
 * */
function SingleMovie(id, reviews) {
  let path = `/3/movie/${id}?api_key=${process.env.API_KEY}`;

  if (reviews) {
    path = `/3/movie/${id}/reviews?api_key=${process.env.API_KEY}`;
  }

  const options = {
    ...httpConstants,
    path: path,
  };

  const spinner = ora("Fetching the movie data...").start();
  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => chalkSingleMovie(JSON.parse(body), spinner, reviews));
  });

  req.on("error", (e) => spinner.fail(e.message));
  req.end();
}

/**
 * get People by Pages from JSON
 * @param page: number of page to render
 */
function JsonPersonByPage(page = 1) {
  const spinner = ora("Loading popular people").start();
  const path = "./src/utils/persons/popular-persons.json";

  try {
    if (fs.existsSync(path)) {
      fs.readFile(path, "utf-8", (err, data) => {
        const user = JSON.parse(data.toString(), null, 4);
        chalkPeople(user, spinner);
      });
    } else {
      spinner.fail("File doesn't exist");
      notifier.notify({
        title: "File Error",
        message: "File doesn't exist",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
}

/**
 * get Movies by Pages from JSON
 * @param page: number of page to render
 * @param nowPlaying: bool, movies that are playing npw
 */
function JsonMoviesByPage(page = 1, nowPlaying) {
  const spinner = ora("Loading popular movies").start();
  const path = "./src/utils/movies/movies.json";

  try {
    if (fs.existsSync(path)) {
      fs.readFile(path, "utf-8", (err, data) => {
        const user = JSON.parse(data.toString(), null, 4);
        chalkMovie(user, spinner, nowPlaying);
        spinner.succeed("Now playing movies data loaded");
        notifier.notify({
          title: "Now Playing Movies - Loaded",
          message: "Now playing movies data loaded",
        });
      });
    } else {
      spinner.fail("File doesn't exist");
      notifier.notify({
        title: "Error",
        message: "File doesn't exist",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  PersonById,
  PersonsByPage,
  MoviesByPage,
  SingleMovie,
  JsonPersonByPage,
  JsonMoviesByPage,
};
