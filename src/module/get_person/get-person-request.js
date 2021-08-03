const https = require("https");

const {
  API_KEY,
  API_HOSTNAME,
  API_TIMEOUT_REQUEST,
} = require("../../utils/constants");

const spinner = require("../../components/spinner");

// Functions to print or save the data
const { printGetPersonInformation } = require("./print-get-person");
const { saveGetPersonData } = require("./get-person-data-local-handle");

function getPersonRequest({ id, save }) {
  const options = {
    hostname: API_HOSTNAME,
    port: 443,
    path: `/3/person/${id}?api_key=${API_KEY}`,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    let dataText = "";

    res.on("data", (d) => {
      dataText += d;

      spinner.start("Fetching the person data...\n\n");
    });

    res.on("end", () => {
      // This timeout is to show the loading data spinner
      setTimeout(() => {
        const dataObject = JSON.parse(dataText);

        if (save) {
          saveGetPersonData(dataText);
        } else {
          printGetPersonInformation(dataObject);
        }
      }, API_TIMEOUT_REQUEST);
    });
  });

  req.on("error", (e) => {
    spinner.fail(`Error "${e.code}" (Code ${e.errno})`);
  });

  req.end();
}

module.exports = { getPersonRequest: getPersonRequest };
