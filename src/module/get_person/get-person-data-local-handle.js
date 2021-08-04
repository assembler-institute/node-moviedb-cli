const fs = require("fs");
const notifier = require("node-notifier");

const spinner = require("../../components/spinner");

const {
  PERSONS_FOLDER_PATH,
  PERSON_FILE_PATH,
  ICON_PATH,
} = require("../../utils/constants");

const { printGetPersonInformation } = require("./print-get-person");

function saveGetPersonData(dataText) {
  // Check if the directory exist
  fs.access(PERSONS_FOLDER_PATH, (error) => {
    if (error) {
      spinner.fail(`${error}, please create it`);
    } else {
      // Write the information into popular-persons.json
      fs.writeFile(PERSON_FILE_PATH, dataText, "utf-8", (writeError) => {
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
            `Person data loaded and saved into ${PERSON_FILE_PATH}`
          );

          // Notify the writting succeed
          notifier.notify({
            title: "MovieDB CLI",
            message: `Person data loaded and saved into ${PERSON_FILE_PATH}`,
            icon: ICON_PATH,
          });
        }
      });
    }
  });
}

function readLocalGetPersonData() {
  fs.readFile(PERSON_FILE_PATH, "utf-8", (readError, data) => {
    if (readError) {
      spinner.fail(
        `Reading error: no such file or directory '${PERSON_FILE_PATH}', please make a '--save' command before execute the '--local' command`
      );

      // Notify the reading error
      notifier.notify({
        title: "MovieDB CLI",
        message: `Reading error: no such file or directory '${PERSON_FILE_PATH}', please make a '--save' command before execute the '--local' command`,
        icon: ICON_PATH,
      });
    } else {
      const dataObject = JSON.parse(data);
      printGetPersonInformation(dataObject);

      // Notify the reading succeed
      notifier.notify({
        title: "MovieDB CLI",
        message: "Person data loaded",
        icon: ICON_PATH,
      });
    }
  });
}

module.exports = {
  saveGetPersonData: saveGetPersonData,
  readLocalGetPersonData: readLocalGetPersonData,
};
