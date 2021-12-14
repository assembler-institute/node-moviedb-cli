const https = require("https");
require("dotenv/config");
const req = require("./req");

function request(id) {
  const api_key = process.env.API_KEY;
  const url = `https://api.themoviedb.org/3/person/${id}?api_key=${api_key}`;

  return req(url);
}

module.exports = request;
