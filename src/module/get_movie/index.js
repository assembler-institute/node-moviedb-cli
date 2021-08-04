const {
  getMovieRequest,
  getMovieReviewsRequest,
} = require("./get-movie-request");
const { readLocalGetMovieData } = require("./get-movie-data-local-handle");

module.exports = {
  getMovieRequest: getMovieRequest,
  getMovieReviewsRequest: getMovieReviewsRequest,
  readLocalGetMovieData: readLocalGetMovieData,
};
