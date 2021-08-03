const fs = require("fs");
const notifier = require("node-notifier");

const spinner = require("../../components/spinner");

const {
  MOVIES_FOLDER_PATH,
  MOVIE_FILE_PATH,
  MOVIE_REVIEWS_FILE_PATH,
  ICON_PATH,
} = require("../../utils/constants");

const {
  printGetMovieInformation,
  printGetMovieReviewsInformation,
} = require("./print-get-movie");

function saveGetMovieData(dataText, reviews = false) {
  let filePath;
  let succeedMessage;
  if (reviews) {
    filePath = MOVIE_REVIEWS_FILE_PATH;
    succeedMessage = `Movies playing now data loaded and saved into ${MOVIE_REVIEWS_FILE_PATH}`;
  } else {
    filePath = MOVIE_FILE_PATH;
    succeedMessage = `Person data loaded and saved into ${MOVIE_FILE_PATH}`;
  }

  // Check if the directory exist
  fs.access(MOVIES_FOLDER_PATH, (error) => {
    if (error) {
      spinner.fail(`${error}, please create it`);
    } else {
      // Write the information into popular-persons.json
      fs.writeFile(filePath, dataText, "utf-8", (writeError) => {
        if (writeError) {
          spinner.fail(writeError);

          // Notify the writting error
          notifier.notify({
            title: "MovieDB CLI",
            message: writeError,
            icon: ICON_PATH,
          });
        } else {
          spinner.succeed(succeedMessage);

          // Notify the writting succeed
          notifier.notify({
            title: "MovieDB CLI",
            message: succeedMessage,
            icon: ICON_PATH,
          });
        }
      });
    }
  });
}

function readLocalGetMovieData(reviews = false) {
  let filePath;
  let succeedMessage;
  if (reviews) {
    filePath = MOVIE_REVIEWS_FILE_PATH;
    succeedMessage = "Movie reviews data loaded";
  } else {
    filePath = MOVIE_FILE_PATH;
    succeedMessage = "Movie data loaded";
  }

  fs.readFile(filePath, "utf-8", (readError, data) => {
    if (readError) {
      spinner.fail(
        `Reading error: no such file or directory '${filePath}', please make a '--save' command before execute the '--local' command`
      );

      // Notify the reading error
      notifier.notify({
        title: "MovieDB CLI",
        message: `Reading error: no such file or directory '${filePath}', please make a '--save' command before execute the '--local' command`,
        icon: ICON_PATH,
      });
    } else {
      const dataObject = JSON.parse(data);

      if (reviews) {
        printGetMovieReviewsInformation(dataObject);
      } else {
        printGetMovieInformation(dataObject);
      }

      // Notify the reading succeed
      notifier.notify({
        title: "MovieDB CLI",
        message: succeedMessage,
        icon: ICON_PATH,
      });
    }
  });
}

module.exports = {
  saveGetMovieData: saveGetMovieData,
  readLocalGetMovieData: readLocalGetMovieData,
};
