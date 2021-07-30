// Imports
require("dotenv").config({ path: "../.env" });
const https = require("https");

// General variables
const apiKey = process.env.API_KEY;
// console.log(apiKey);

function getPersons(pageNum, key) {
  const options = {
    hostname: "localhost",
    port: 443,
    path: `https://api.themoviedb.org/3/person/popular?page=${pageNum}&api_key=${key}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let finalResult = new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      // console.log(`STATUS: ${res.statusCode}`);
      // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding("utf8");
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(responseBody));
        console.log("This is the response ", responseBody);
      });
    });

    req.on("error", (err) => {
      reject(err);
    });
  });

  return finalResult;
}

getPersons(1, apiKey);

// module.exports = { getPersons };
