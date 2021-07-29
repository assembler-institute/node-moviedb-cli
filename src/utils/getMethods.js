const https = require("https");
const ora = require("ora");

/**
 * Persons by Pages
 */
function getPersonsByPage(page = 1) {
  const options = {
    host: "api.themoviedb.org",
    port: 443,
    protocol: "https:",
    path: `/3/person/popular?page=${page}&api_key=${process.env.API_KEY}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  const req = https.request(options, (res) => {
    let body = "";

    const spinner = ora("Loading data").start();

    res.on("data", (chunk) => {
      body += chunk;
    });

    res.on("end", () => {
      try {
        let json = JSON.parse(body);
        setTimeout(() => {
          console.log(json);
          spinner.succeed("Data fetched successfully");
        }, 2000);
      } catch (error) {
        console.error(error.message);
      }
    });
  });

  req.on("error", (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.end();
}

/**
 * Popular functions
 */
function getPopularPersons() {
  console.log("personas populares como Einar ");
}

module.exports = { getPersonsByPage, getPopularPersons };
