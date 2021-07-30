const https = require('https');

function getPersons(options) {
  const req = https.request(options, (res) => {
    let response = '';

    res.on("data", function onData(chunk) {
      response += chunk;
    });

    res.on("end", function onEnd() {
      const data = JSON.parse(response);
      console.log(data);
      return data;
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}

module.exports = {
  getPersons: getPersons,
};

