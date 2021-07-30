const https = require("https");

async function getPersons(options) {
  let promise = new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let response = "";

      res.on("data", function onData(chunk) {
        response += chunk;
      });

      res.on("end", function onEnd() {
        const data = JSON.parse(response);
        resolve(data);
      });

      res.on("error", function (error) {
        reject(error);
      });
    });

    req.end();
  });
  return await promise;
}

function getPerson(options) {
  const req = https.request(options, (res) => {
    let response = "";

    res.on("data", function onData(chunk) {
      response += chunk;
    });

    res.on("end", function onEnd() {
      const data = JSON.parse(response);
      console.log(data);
    });
  });

  req.on("error", (e) => {
    console.error(e);
  });
  req.end();
}

module.exports = {
  getPersons: getPersons,
  getPerson,
};
