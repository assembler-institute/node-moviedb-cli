const https = require("https");
const spinner = require("./spinner_persons");
const render = require("./render_persons");
const { exit } = require("process");
require("dotenv/config");

exports.httpRequest = function (endPoint, option1 = "", option2 = "") {
  const spin = spinner.start(endPoint);
  https
    .get(
      `https://api.themoviedb.org/3/${endPoint}?api_key=${process.env.API_KEY}&${option1}&${option2}`,
      (response) => {
        let result = "";

        response.on("data", (c) => {
          result += c;
        });

        response.on("end", () => {
          if (result === "") {
            spin.fail("Error: can't find your request");
            return;
          }

          switch (endPoint) {
            case "person/popular":
              render.persons(JSON.parse(result));
              break;
          }

          spin.succeed("Popular Persons data loaded");
        });
      }
    )
    .on("error", (err) => {
      spin.fail("Error: " + err.message);
    });
};
