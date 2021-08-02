// Imports
// ---------------------------------------------------
require("dotenv").config({ path: "../.env" });
const https = require("https");

// General variables
// ---------------------------------------------------
const apiKey = process.env.API_KEY;

// Request Function
// ---------------------------------------------------
function makeHTTPRequest(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding("utf8");
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(responseBody));
      });
    });

    req.on("error", (err) => {
      reject(err);
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

  return makeHTTPRequest(options);
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

  return makeHTTPRequest(options);
}

function getMovies(page, nowPlaying, key = apiKey) {
  // Initializing http request params
  let requestPath = "";

  if (nowPlaying) {
    requestPath = `/3/movie/now_playing?page=${page}&api_key=${key}`;
  } else {
    requestPath = `/3/movie/popular?page=${page}&api_key=${key}`;
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

  return makeHTTPRequest(options);
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

  return makeHTTPRequest(options);
}

function getReviews(movieId, page = 1, key = apiKey) {
  const options = {
    hostname: "api.thmoviedb.org",
    port: 443,
    path: `/3/movie/${movieId}/reviews?page=${page}&api_key=${key}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return makeHTTPRequest(options);
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
