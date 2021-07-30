const https = require("https");
const spinner = require("../components/spinner");
const chalk = require("chalk");

const error = chalk.bold.red;
const warning = chalk.hex("#FFA500"); // Orange color
console.log(error("Error!"));
console.log(warning("Warning!"));

require("dotenv").config();
const API_KEY = process.env.API_KEY;
function getPersons({ page }) {
  const options = {
    hostname: "api.themoviedb.org",
    port: 443,
    path: `/3/person/popular?page=${page}&api_key=${API_KEY}`,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    // console.log("statusCode:", res.statusCode);
    // console.log("headers:", res.headers);
    let body = "";
    res.on("data", (d) => {
      body += d;
      //spinner.color = "red";
      //spinner.start();
    });
    res.on("end", () => {
      const dataObject = JSON.parse(body);
      //console.log(dataObject);
    });
  });

  req.on("error", (e) => {
    //console.error(e);
    spinner.fail(`Error code:${e.errno} code:${e.code}`);
  });
  req.end();
}

module.exports = { getPersons: getPersons };
