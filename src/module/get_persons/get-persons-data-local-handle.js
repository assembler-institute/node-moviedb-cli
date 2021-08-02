const fs = require("fs");
const notifier = require("node-notifier");

const spinner = require("../../components/spinner");

const {
  PERSONS_FOLDER_PATH,
  PERSONS_FILE_PATH,
  ICON_PATH,
} = require("../../utils/constants");

const { printGetPersonsInformation } = require("./print-get-persons");

function saveGetPersonsData(dataText) {
  // Check if the directory exist
  fs.access(PERSONS_FOLDER_PATH, (error) => {
    if (error) {
      spinner.fail(`${error}, please create it`);
    } else {
      // Write the information into popular-persons.json
      fs.writeFile(PERSONS_FILE_PATH, dataText, "utf-8", (writeError) => {
        if (writeError) {
          spinner.fail(writeError);

          // Notify the writting error
          notifier.notify({
            title: "MovieDB CLI",
            message: writeError,
            icon: ICON_PATH,
          });
        } else {
          spinner.succeed(
            `Popular Persons data loaded and saved into ${PERSONS_FILE_PATH}`
          );

          // Notify the writting succeed
          notifier.notify({
            title: "MovieDB CLI",
            message: `Popular Persons data loaded and saved into ${PERSONS_FILE_PATH}`,
            icon: ICON_PATH,
          });
        }
      });
    }
  });
}

function readLocalGetPersonsData() {
  fs.readFile(PERSONS_FILE_PATH, "utf-8", (readError, data) => {
    if (readError) {
      spinner.fail(
        `Reading error: no such file or directory '${PERSONS_FILE_PATH}', please make a '--save' command before execute the '--local' command`
      );

      // Notify the reading error
      notifier.notify({
        title: "MovieDB CLI",
        message: `Reading error: no such file or directory '${PERSONS_FILE_PATH}', please make a '--save' command before execute the '--local' command`,
        icon: ICON_PATH,
      });
    } else {
      const dataObject = JSON.parse(data);
      printGetPersonsInformation(dataObject);

      // Notify the reading succeed
      notifier.notify({
        title: "MovieDB CLI",
        message: "Popular Persons data loaded",
        icon: ICON_PATH,
      });
    }
  });
}

module.exports = {
  saveGetPersonsData: saveGetPersonsData,
  readLocalGetPersonsData: readLocalGetPersonsData,
};
