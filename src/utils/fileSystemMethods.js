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
  const x = await ensureDirectory(directory);
  if (isNowPlaying === true) {
    saveJson(directory, "now-playing-movies.json", moviesJson);
  } else {
    saveJson(directory, "popular-movies.json", moviesJson);
  }
}

module.exports = { saveMovies: saveMovies };
