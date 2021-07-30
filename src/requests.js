// Imports
require("dotenv").config({ path: "../.env" });
const https = require("https");

// General variables
const apiKey = process.env.API_KEY;
const pageNum = 1;

function getPersons(page, key = apiKey) {
  const options = {
    hostname: "api.themoviedb.org",
    port: 443,
    path: `/3/person/popular?page=${page}&api_key=${key}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let finalResult = new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding("utf8");
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(responseBody));
        // console.log("This is the response ", responseBody);
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });

  return finalResult;
}

// getPersons(pageNum, apiKey).then((result) => {
//   console.log(result.results[0]);
// });

module.exports = { getPersons };
