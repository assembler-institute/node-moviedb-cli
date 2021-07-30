// Imports
require("dotenv").config({ path: "../.env" });
const https = require("https");

// General variables
const apiKey = process.env.API_KEY;
const pageNum = 1;

// const options = {
//   hostname: "api.themoviedb.org",
//   port: 443,
//   path: `/3/person/popular?page=${pageNum}&api_key=${apiKey}`,
//   method: "GET",
// };

// const req = https.request(options, (res) => {
//   console.log("statusCode:", res.statusCode);
//   console.log("headers:", res.headers);

//   res.on("data", (d) => {
//     process.stdout.write(d);
//   });
// });

// req.on("error", (e) => {
//   console.error(e);
// });
// req.end();

function getPersons(pageNum, key) {
  const options = {
    hostname: "api.themoviedb.org",
    port: 443,
    path: `/3/person/popular?page=${pageNum}&api_key=${key}`,
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

getPersons(1, apiKey).responseBody;

module.exports = { getPersons };
