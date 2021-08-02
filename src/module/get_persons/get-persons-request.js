const https = require("https");

const {
  API_KEY,
  API_HOSTNAME,
  API_TIMEOUT_REQUEST,
} = require("../../utils/constants");

const spinner = require("../../components/spinner");

// Functions to print or save the data
const { printGetPersonsInformation } = require("./print-get-persons");
const { saveGetPersonsData } = require("./get-persons-data-local-handle");

function getPersonsRequest({ page, save }) {
  const options = {
    hostname: API_HOSTNAME,
    port: 443,
    path: `/3/person/popular?page=${page}&api_key=${API_KEY}`,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    let dataText = "";

    res.on("data", (d) => {
      dataText += d;

      spinner.start("Fetching the popular person's data...\n\n");
    });

    res.on("end", () => {
      // This timeout is to show the loading data spinner
      setTimeout(() => {
        const dataObject = JSON.parse(dataText);

        if (save) {
          saveGetPersonsData(dataText);
        } else {
          printGetPersonsInformation(dataObject);
        }
      }, API_TIMEOUT_REQUEST);
    });
  });

  req.on("error", (e) => {
    spinner.fail(`Error "${e.code}" (Code ${e.errno})`);
  });

  req.end();
}

module.exports = { getPersonsRequest: getPersonsRequest };
