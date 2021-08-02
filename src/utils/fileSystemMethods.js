const fs = require("fs");
var path = require("path");

async function ensureDirectory(folderPath) {
  // Creates the folder if it doesn't exist
  const promise = new Promise((resolve, reject) => {
    fs.mkdir(path.resolve(folderPath), { recursive: true }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
  return await promise;
}

function saveJson(directory, filename, data) {
  fs.writeFile(
    path.resolve(directory, filename),
    JSON.stringify(data),
    (error) => {
      if (error) console.error(error);
    }
  );
}

async function saveMovies(moviesJson = {}, isNowPlaying) {
  const directory = "./files/movies";
  await ensureDirectory(directory);
  if (isNowPlaying === true) {
    saveJson(directory, "now-playing-movies.json", moviesJson);
  } else {
    saveJson(directory, "popular-movies.json", moviesJson);
  }
}

async function saveMovie(movieJson = {}) {
  const directory = "./files/movies";
  await ensureDirectory(directory);
  saveJson(directory, "movie.json", movieJson);
}

async function saveMovieReview(movieReviewJson = {}) {
  const directory = "./files/movies";
  await ensureDirectory(directory);
  saveJson(directory, "movie-review.json", movieReviewJson);
}

async function savePopularPersons(personsJson = {}) {
  const directory = "./files/persons";
  await ensureDirectory(directory);
  saveJson(directory, "popular-persons.json", personsJson);
}

async function savePerson(personJson = {}) {
  const directory = "./files/persons";
  await ensureDirectory(directory);
  saveJson(directory, "person.json", personJson);
}

async function loadJson(directory, fileName) {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(path.resolve(directory, fileName), "utf8", (error, data) => {
      if (error !== null) {
        if (error.code === "ENOENT") {
          reject("File doesn't exist ⛔");
        } else {
          reject(error.message);
        }
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
  return promise;
}

async function loadMovies(isNowPlaying) {
  const directory = "./files/movies";
  let json = [];
  if (isNowPlaying === true) {
    json = await loadJson(directory, "now-playing-movies.json");
  } else {
    json = await loadJson(directory, "popular-movies.json");
  }
  return json;
}

async function loadMovie() {
  const directory = "./files/movies";
  let json = [];
  json = await loadJson(directory, "movie.json");
  return json;
}

async function loadMovieReviews() {
  const directory = "./files/movies";
  let json = [];
  json = await loadJson(directory, "movie-review.json");
  return json;
}

async function loadPopularPersons() {
  const directory = "./files/persons";
  let json = [];
  json = await loadJson(directory, "popular-persons.json");
  return json;
}

async function loadPerson() {
  const directory = "./files/persons";
  let json = [];
  json = await loadJson(directory, "person.json");
  return json;
}

module.exports = {
  saveMovies: saveMovies,
  loadMovies: loadMovies,
  savePopularPersons: savePopularPersons,
  loadPopularPersons: loadPopularPersons,
  savePerson: savePerson,
  loadPerson: loadPerson,
  saveMovie: saveMovie,
  loadMovie: loadMovie,
  saveMovieReview: saveMovieReview,
  loadMovieReviews: loadMovieReviews,
};
