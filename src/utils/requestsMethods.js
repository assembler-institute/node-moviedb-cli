const https = require("https");
require("dotenv").config();

const globalOptions = {
  hostname: "api.themoviedb.org",
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
  maxRedirects: 20,
};

async function getPopularPersons(page = 1) {
  const options = {
    ...globalOptions,
    method: "GET",
    path: `/3/person/popular?page=${page}`,
  };
  let promise = new Promise((resolve, reject) => {
    const request = https.request(options, (res) => {
      let chunks = [];
      res.on("data", (chunk) => {
        chunks.push(chunk);
      });

      res.on("end", (chunk) => {
        resolve(JSON.parse(Buffer.concat(chunks).toString()));
        // console.log(JSON.parse(Buffer.concat(chunks).toString()));
      });

      res.on("error", (err) => {
        reject(err);
      });
    });
    request.end();
  });
  return await promise;
}

async function getPersons(page = 2) {
  const options = {
    ...globalOptions,
    method: "GET",
    path: `/3/person/popular?page=${page}`,
  };
  let promise = new Promise((resolve, reject) => {
    const request = https.request(options, (res) => {
      let chunks = [];
      res.on("data", (chunk) => {
        chunks.push(chunk);
      });

      res.on("end", (chunk) => {
        resolve(JSON.parse(Buffer.concat(chunks).toString()));
      });

      res.on("error", (err) => {
        reject(err);
      });
    });
    request.end();
  });
  return await promise;
}

async function getPerson(personId = 990393) {
  const options = {
    ...globalOptions,
    method: "GET",
    path: `/3/person/${personId}`,
  };
  let promise = new Promise((resolve, reject) => {
    const request = https.request(options, (res) => {
      let chunks = [];
      res.on("data", (chunk) => {
        chunks.push(chunk);
      });

      res.on("end", (chunk) => {
        resolve(JSON.parse(Buffer.concat(chunks).toString()));
        // console.log(JSON.parse(Buffer.concat(chunks).toString()));
      });

      res.on("error", (err) => {
        reject(err);
      });
    });
    request.end();
  });
  return await promise;
}

module.exports = {
  getPopularPersons: getPopularPersons,
  getPerson: getPerson,
  getPersons: getPersons,
};
