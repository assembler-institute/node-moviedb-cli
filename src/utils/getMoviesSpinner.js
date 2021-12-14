const ora = require("ora");
const getMovies = require("./getMoviesReq");
const { white, boldBlue, red, line } = require("./chalk");
const saveData = require("./saveData");
const fetchFromLocal = require("./fetchFromLocal");

function spinner(pageNumber, nowPlaying, save, local) {
  const spinner = ora("Fetching movies...").start();
  spinner.spinner = "monkey";

  setTimeout(async () => {
    if (local && nowPlaying) {
      try {
        const localData = await fetchFromLocal("now-playing");
        localData.forEach((element) => {
          console.log("\nMovie:\n");
          console.log(`ID: ${white(element.id)}`);
          console.log(`Title: ${boldBlue(element.title)}`);
          console.log(`Release Date: ${white(element.release_date)}\n`);
        });
        line;
        spinner.succeed("Data successfully read from local JSON!");
      } catch (err) {
        spinner.fail("There was an error reading your local data");
        console.log(red(err));
      }
    } else if (local && !nowPlaying) {
      try {
        const localData = await fetchFromLocal("most-popular");
        localData.forEach((element) => {
          console.log("\nMovie:\n");
          console.log(`ID: ${white(element.id)}`);
          console.log(`Title: ${boldBlue(element.title)}`);
          console.log(`Release Date: ${white(element.release_date)}\n`);
        });
        line;
        spinner.succeed("Data successfully read from local JSON!");
      } catch (err) {
        spinner.fail("There was an error reading your local data");
        console.log(red(err));
      }
    } else {
      try {
        const res = await getMovies(pageNumber, nowPlaying);

        if (save && nowPlaying) {
          saveData("now-playing", JSON.stringify(res.results));
          spinner.succeed("Movies in the theatres right now have been stored!");
        } else if (save && !nowPlaying) {
          saveData("most-popular", JSON.stringify(res.results));
          spinner.succeed("The most popular movies have been stored!");
        } else {
          res.results.forEach((element) => {
            console.log("\nMovie:\n");
            console.log(`ID: ${white(element.id)}`);
            console.log(`Title: ${boldBlue(element.title)}`);
            console.log(`Release Date: ${white(element.release_date)}\n`);
          });
          console.log(
            line,
            white(`Page: ${pageNumber} of ${res.total_pages}\n`)
          );
          nowPlaying
            ? spinner.succeed("Movies in the theatres right now loaded!")
            : spinner.succeed("Most popular movies loaded!");
        }
      } catch (err) {
        spinner.fail("There was an error with the data");
        console.log(red(err));
      }
    }

    spinner.stop();
  }, 2000);
}

module.exports = spinner;
