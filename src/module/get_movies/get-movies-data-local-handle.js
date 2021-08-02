const fs = require("fs");
const notifier = require("node-notifier");
const spinner = require("../../components/spinner");

const {
  MOVIES_FOLDER_PATH,
  MOVIES_FILE_PATH,
  ICON_PATH,
} = require("../../utils/constants");

const { printGetMoviesInformation } = require("./print-get-movies");

function saveGetMoviesData(dataText) {
  fs.access(MOVIES_FOLDER_PATH, (error) => {
    if (error) {
      spinner.fail(`${error}, please create it`);
    } else {
      fs.writeFile(MOVIES_FILE_PATH, dataText, "utf-8", (writeError) => {
        if (writeError) {
          spinner.fail(writeError);

          notifier.notify({
            title: "MovieDB CLI",
            message: writeError,
            icon: ICON_PATH,
          });
        } else {
          spinner.succeed(
            `Popular Movies data loaded and saved into ${MOVIES_FOLDER_PATH}`
          );

          notifier.notify({
            title: "MovieDB CLI",
            message: `Popular Movies data loaded and saved into ${MOVIES_FOLDER_PATH}`,
            icon: ICON_PATH,
          });
        }
      });
    }
  });
}

function readLocalGetMoviesData() {
  fs.readFile(MOVIES_FILE_PATH, "utf-8", (readError, data) => {
    if (readError) {
      spinner.fail(
        `Reading error: no such file or directory '${MOVIES_FILE_PATH}', please make a '--save' command before execute the '--local' command`
      );

      notifier.notify({
        title: "MovieDB CLI",
        message: `Reading error: no such file or directory '${MOVIES_FILE_PATH}', please make a '--save' command before execute the '--local' command`,
        icon: ICON_PATH,
      });
    } else {
      const dataObject = JSON.parse(data);
      printGetMoviesInformation(dataObject);

      notifier.notify({
        title: "MovieDB CLI",
        message: "Popular Persons data loaded",
        icon: ICON_PATH,
      });
    }
  });
}

module.exports = {
  saveGetMoviesData: saveGetMoviesData,
  readLocalGetMoviesData: readLocalGetMoviesData,
};
