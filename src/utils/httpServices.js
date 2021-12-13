const https = require("https");
const { URL } = require("url");

function get(url) {
  return new Promise((resolve, reject) => {
    const REQUEST_URL = new URL(url);
    const req = https.request(REQUEST_URL, (res) => {
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
  get: get,
};
