// Imports
require("dotenv").config({ path: "../.env" });
const https = require("https");

// General variables
const apiKey = process.env.API_KEY;

function makeHTTPRequest() {

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
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

}

function getMovies(pageNum, key) {
  const options = {
    hostname: "localhost",
    port: 443,
    path: `https://api.themoviedb.org/3/movie/popular?page=${pageNum}&api_key=${key}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

}

getPersons(1, apiKey);