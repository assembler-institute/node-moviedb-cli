const https = require("https");
require("dotenv/config");
const req = require("./req");

function request(pageNumber) {
  const api_key = process.env.API_KEY;
  const url = `https://api.themoviedb.org/3/person/popular?api_key=${api_key}&page=${pageNumber}`;

  return req(url);
}

module.exports = request;
