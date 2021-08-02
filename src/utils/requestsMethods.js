const https = require("https");
require("dotenv").config();

const globalOptions = {
  hostname: "apisssssss.themoviedb.org",
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
  maxRedirects: 20,
};

async function getPopularMovies(page = 1) {
  const options = {
    ...globalOptions,
    method: "GET",
    path: `/3/movie/popular?page=${page}`,
  };
  let promise = new Promise((resolve, reject) => {
    const req = https.request(options, function (res) {
      let chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        resolve(JSON.parse(Buffer.concat(chunks).toString()));
      });

      // res.on("error", function (error) {
      //   reject(error);
      // });
    });
    req.on("error", function (error) {
      // console.log(error.message);
      reject(error);
    });

    req.end();
  });
  return await promise;
}

async function getNowPlayingMovies(page = 1) {
  const options = {
    ...globalOptions,
    method: "GET",
    path: `/3/movie/now_playing?page=${page}`,
  };
  let promise = new Promise((resolve, reject) => {
    const req = https.request(options, function (res) {
      let chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        resolve(JSON.parse(Buffer.concat(chunks).toString()));
      });

      res.on("error", function (error) {
        reject(error);
      });
    });

    req.end();
  });
  return await promise;
}

async function getMovie(movieId = 460465) {
  const options = {
    ...globalOptions,
    method: "GET",
    path: `/3/movie/${movieId}`,
  };
  let promise = new Promise((resolve, reject) => {
    const req = https.request(options, function (res) {
      let chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        resolve(JSON.parse(Buffer.concat(chunks).toString()));
      });

      res.on("error", function (error) {
        reject(error);
      });
    });

    req.end();
  });
  return await promise;
}

async function getMovieReviews(movieId = 460465) {
  const options = {
    ...globalOptions,
    method: "GET",
    path: `/3/movie/${movieId}/reviews`,
  };
  let promise = new Promise((resolve, reject) => {
    const req = https.request(options, function (res) {
      let chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        resolve(JSON.parse(Buffer.concat(chunks).toString()));
      });

      res.on("error", function (error) {
        reject(error);
      });
    });

    req.end();
  });
  return await promise;
}

module.exports = {
  getPopularMovies: getPopularMovies,
  getNowPlayingMovies: getNowPlayingMovies,
  getMovie: getMovie,
  getMovieReviews: getMovieReviews,
};
