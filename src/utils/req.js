const https = require("https");
require("dotenv/config");

function promise(url) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, (res) => {
      if (res.statusCode == 200) {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          const json = JSON.parse(body);
          resolve(json);
        });
      } else {
        reject(`ERROR STATUS: ${res.statusCode}`);
      }
    });
    req.end();
  });
}

module.exports = promise;

//CALLBACK FUNCTION OPTION
//   const req = https.request(url, (res) => {
// console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//     console.log(res.statusCode);
//     if (res.statusCode == 200) {
//       let body = "";
//       res.on("data", (chunk) => {
//         body += chunk;
//       });
//       res.on("end", () => {
//         const json = JSON.parse(body);
//         callback(true);
// console.log(json);
//       });
//     } else {
//       console.log(`ERROR STATUS: ${res.statusCode}`);
//       callback(false);
//     }
//   });
