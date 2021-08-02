const https = require("https");
const fs = require("fs");
const { movie_render } = require("./render_movie");
const spin = require("./spinner");
const render = require("./render_globals");
require("dotenv/config");

exports.httpRequest = function (endPoint, option1 = "", option2 = "") {
  const spinner = spin.start(endPoint);
  https
    .get(
      `https://api.themoviedb.org/3/${endPoint}?api_key=${process.env.API_KEY}&${option1}&${option2}`,
      (response) => {
        let result = "";
        response.on("data", (d) => {
          result += d;
        });

        response.on("end", () => {
          if (result === "") {
            spinner.fail("Error: can't find your request");
            return;
          }

          if (endPoint === "person/popular") {
            render.persons(JSON.parse(result));
            spinner.succeed("Popular Persons data loaded");
            return;
          } else if (endPoint === "movie/popular") {
            render.movies(JSON.parse(result));
            spinner.succeed("Popular movies data loaded");
            return;
          } else if (endPoint === "movie/now_playing") {
            render.movies(JSON.parse(result));
            spinner.succeed("Movies playing now data loaded");
            return;
          } else if (endPoint.includes("movie/")) {
            movie_render(JSON.parse(result));
            spinner.succeed("Film loaded successfully");
            return;
          }
        });
      }
    )
    .on("error", (err) => {
      spinner.fail("Error: " + err.message);
    });
  spinner.stop();
};
