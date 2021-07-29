const https = require("https");
const ora = require("ora");

/**
 * Persons by Pages
 */
function PersonsByPage(page = 1) {
  const options = {
    host: "api.themoviedb.org",
    protocol: "https:",
    path: `/3/person/popular?page=${page}&api_key=${process.env.API_KEY}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  const spinner = ora("Loading popular people").start();

  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (chunk) => {
      body += chunk;
    });

    res.on("end", () => {
      try {
        let json = JSON.parse(body);
        setTimeout(() => {
          console.log("\n", json);
          spinner.succeed("Data fetched successfully");
        }, 2000);
      } catch (error) {
        spinner.fail(error.message);
      }
    });
  });

  req.on("error", (e) => {
    spinner.fail(e.message);
  });

  req.end();
}

module.exports = { PersonsByPage };
