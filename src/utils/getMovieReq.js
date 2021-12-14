const https = require("https");
require("dotenv/config");
const req = require("./req");

function request(id, reviews) {
  const api_key = process.env.API_KEY;
  let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`;

  reviews
    ? (url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${api_key}`)
    : null;

  return req(url);
}

module.exports = request;
