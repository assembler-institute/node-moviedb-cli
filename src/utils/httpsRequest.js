const https = require('https');

async function getPersons(options) {
  let promise = new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let response = '';

      res.on("data", function onData(chunk) {
        response += chunk;
      });

      res.on("end", function onEnd() {
        const data = JSON.parse(response);
        resolve(data);
      });

      res.on("error", function (error) {
        reject(error);
      })
    });

    req.end()
  });
  return await promise;
}

module.exports = {
  getPersons: getPersons,
};

