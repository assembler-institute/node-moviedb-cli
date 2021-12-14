const https = require("https");
require("dotenv/config");
const req = require("./req");

function request(pageNumber, nowPlaying) {
  const api_key = process.env.API_KEY;
  let url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=${pageNumber}`;

  nowPlaying
    ? (url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&page=${pageNumber}`)
    : null;

  return req(url);
}

module.exports = request;
