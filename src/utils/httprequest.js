const https = require("https");
const fs = require("fs");
const ora = require("ora");
const chalk = require('chalk');
const { movie_render } = require("./movie_render");
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
         let obj = JSON.parse(result);
         movie_render(obj);
         spinner.succeed('Film loaded successfully');
      }); 
    }
  ).on ('error', (err) => {
    spinner.fail(err.message);
  });
  spinner.stop();
};



