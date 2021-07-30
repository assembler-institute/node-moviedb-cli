const https = require("https");
const spinner = require("./spinner_persons");
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
          console.log(JSON.parse(result));
          spin.stop();
        });
      }
    )
    .on("error", (err) => {
      console.log("Falló: " + err);
      /* spin.fail("Falló"); */
    });
};
