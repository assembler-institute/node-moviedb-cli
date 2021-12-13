const https = require("https");
require("dotenv").config();

function getPersonsByPage(page) {
  return new Promise((resolve, reject) => {
    const options = {
      href: "https://api.themoviedb.org",
      protocol: "https:",
      hostname: "api.themoviedb.org",
      path: `/3/person/popular?api_key=${process.env.API_KEY}&page=${page}`,
      port: 443,
      method: "GET",
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const obj = JSON.parse(data);
        resolve(obj);
      });

      res.on("error", (err) => {
        console.log(err);
        reject(err);
      });
    });
    req.end();
  });
}

module.exports = {
  getPersonsByPage: getPersonsByPage,
};
