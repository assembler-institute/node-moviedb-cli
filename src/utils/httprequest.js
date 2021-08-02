const https = require("https");
const fs = require("fs");
const ora = require("ora");
const chalk = require('chalk');
const { movie_render } = require("./movie_render");
const spinner = require("./spinner_persons");
const render = require("./render_persons");
require("dotenv/config");

exports.httpRequest = function (endPoint, option1 = "", option2 = "") {
  const spinner = ora('Loading Film').start();
  https.get(
    `https://api.themoviedb.org/3/${endPoint}?api_key=${process.env.API_KEY}&${option1}&${option2}`,
    (response) => {
        let result = '';
        response.on("data", (d) => {
        result += d;
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
          case 'movie/70':
            let obj = JSON.parse(result);
            movie_render(obj);
            spinner.succeed('Film loaded successfully');
            break;
        }
      
      });

    }
  ).on ('error', (err) => {
    spinner.fail('Error: ' + err.message);
  });
  spinner.stop();
}


