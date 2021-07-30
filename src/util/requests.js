const https = require("https");
const ora = require("ora");
const chalk = require("chalk");

function getPerson(id) {
  const options = {
    href: "https://api.themoviedb.org",
    protocol: "https:",
    hostname: "api.themoviedb.org",
    path: `/3/person/${id}?`,
    // path: `/3/person/popular?page=1&api_key=f599dfd0f0fe1ae38c4420cd239f2cd2`,
    port: 443,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };
  const spinner = ora("Fetching the person's data...").start();
  console.log("hello-world");
  const req = https.request(options, (res) => {
    let response = "";

    res.on("data", function onData(chunk) {
      response += chunk;
    });

    res.on("end", function onEnd() {
      const data = JSON.parse(response);
      // for (const element in data) {
      //   console.log(element);
      // }
      console.log(chalk.blue(data.birthday));
    });
  });

  req.on("error", (e) => {
    console.error(e);
  });
  req.end();
  spinner.succeed("Person data loaded");
}

module.exports = {
  getPerson,
};
