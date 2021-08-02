const { getMovies, getMoviesNowPlaying } = require("./getMoviesRequest");
const { readLocalGetMoviesData } = require("./get-movies-data-local-handle");

module.exports = {
  getMovies: getMovies,
  getMoviesNowPlaying: getMoviesNowPlaying,
  readLocalGetMoviesData: readLocalGetMoviesData,
};
