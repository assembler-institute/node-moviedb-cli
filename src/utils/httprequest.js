const https = require("https");
const fs = require("fs");
require("dotenv/config");

exports.httpRequest = function (endPoint, option1 = "", option2 = "") {
  https.get(
    `https://api.themoviedb.org/3/${endPoint}?api_key=${process.env.API_KEY}&${option1}&${option2}`,
    (response) => {
      response.on("data", (d) => {
        let result;
        result += d;
        console.log(result);
        /* console.log(result); */
        /* console.log(d); */
        /* process.stdout.write(d); */
      });

      /* response.on("end", () => {
        console.log(result);
      }); */
    }
  );
};
