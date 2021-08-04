const {
  getMoviesRequest,
  getMoviesNowPlayingRequest,
} = require("./get-movies-request");
const { readLocalGetMoviesData } = require("./get-movies-data-local-handle");

module.exports = {
  getMoviesRequest: getMoviesRequest,
  getMoviesNowPlayingRequest: getMoviesNowPlayingRequest,
  readLocalGetMoviesData: readLocalGetMoviesData,
};
