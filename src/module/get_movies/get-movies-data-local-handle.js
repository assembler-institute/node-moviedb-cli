const fs = require("fs");
const notifier = require("node-notifier");
const spinner = require("../../components/spinner");

const {
  MOVIES_FOLDER_PATH,
  MOVIES_FILE_PATH,
  MOVIES_NP_FILE_PATH,
  ICON_PATH,
} = require("../../utils/constants");

const { printGetMoviesInformation } = require("./print-get-movies");

function saveGetMoviesData(dataText, nowPlaying = false) {
  let filePath;
  let succeedMessage;
  if (nowPlaying) {
    filePath = MOVIES_NP_FILE_PATH;
    succeedMessage = `Movies playing now data loaded and saved into ${MOVIES_NP_FILE_PATH}`;
  } else {
    filePath = MOVIES_FILE_PATH;
    succeedMessage = `Popular Movies data loaded and saved into ${MOVIES_FILE_PATH}`;
  }

  fs.access(MOVIES_FOLDER_PATH, (error) => {
    if (error) {
      spinner.fail(`${error}, please create it`);
    } else {
      fs.writeFile(filePath, dataText, "utf-8", (writeError) => {
        if (writeError) {
          spinner.fail(writeError);

          notifier.notify({
            title: "MovieDB CLI",
            message: writeError,
            icon: ICON_PATH,
          });
        } else {
          spinner.succeed(succeedMessage);

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

function readLocalGetMoviesData(nowPlaying = false) {
  let filePath;
  let succeedMessage;
  if (nowPlaying) {
    filePath = MOVIES_NP_FILE_PATH;
    succeedMessage = "Movies playing now data loaded";
  } else {
    filePath = MOVIES_FILE_PATH;
    succeedMessage = "Popular Persons data loaded";
  }

  fs.readFile(filePath, "utf-8", (readError, data) => {
    if (readError) {
      spinner.fail(
        `Reading error: no such file or directory '${filePath}', please make a '--save' command before execute the '--local' command`
      );

      notifier.notify({
        title: "MovieDB CLI",
        message: `Reading error: no such file or directory '${filePath}', please make a '--save' command before execute the '--local' command`,
        icon: ICON_PATH,
      });
    } else {
      const dataObject = JSON.parse(data);
      printGetMoviesInformation(dataObject, nowPlaying);

      notifier.notify({
        title: "MovieDB CLI",
        message: succeedMessage,
        icon: ICON_PATH,
      });
    }
  });
}

module.exports = {
  saveGetMoviesData: saveGetMoviesData,
  readLocalGetMoviesData: readLocalGetMoviesData,
};
