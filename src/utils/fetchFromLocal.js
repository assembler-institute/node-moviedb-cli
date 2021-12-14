const fs = require("fs");
const notifier = require("node-notifier");

function fetchFromLocal(type) {
  let path = "src/files";
  switch (type) {
    case "persons":
      path = "src/files/persons/persons.json";
      break;
    case "now-playing":
      path = "src/files/movies/now-playing-movies.json";
      break;
    case "most-popular":
      path = "src/files/movies/popular-movies.json";
      break;
    default:
      break;
  }
  return new Promise((resolve, reject) => {
    fs.access(path, fs.F_OK, (err) => {
      if (err) {
        spinner.fail("The file does not exist");
        console.log(red(err));
        return;
      }

      fs.readFile(path, (err, data) => {
        if (err) {
          console.log(red(err));
          reject();
        } else {
          notifier.notify({
            title: "Stored Persons Data",
            message: "Your data was perfectly saved!",
          });
          resolve(JSON.parse(data));
        }
      });
    });
  });
}

module.exports = fetchFromLocal;
