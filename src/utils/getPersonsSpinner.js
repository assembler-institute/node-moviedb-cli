const ora = require("ora");

const getPersons = require("./getPersonsReq");
const { white, blue, magenta, red, line } = require("./chalk");
const saveData = require("./saveData");
const fetchFromLocal = require("./fetchFromLocal");

function spinner(pageNumber, save, local) {
  const spinner = ora("Fetching the popular people's data...").start();
  spinner.color = "yellow";
  spinner.spinner = "boxBounce2";

  setTimeout(async () => {
    if (local) {
      try {
        const localData = await fetchFromLocal("persons");
        localData.forEach((element) => {
          console.log("Person:\n");
          console.log(`ID: ${white(element.id)}`);
          console.log(`Name: ${blue(element.name)}`);

          element.known_for_department === "Acting"
            ? console.log(
                `Department: ${magenta(element.known_for_department)}`
              )
            : null;

          if (element.known_for.some((element) => element.title)) {
            console.log("Appearing in movies:\n");
            element.known_for.forEach((movie) => {
              if (movie.title !== undefined) {
                console.log(`\tMovie:`);
                console.log(`\tID: ${white(movie.id)}`);
                console.log(`\tRelease Date: ${white(movie.release_date)}`);
                console.log(`\tTitle: ${white(movie.title)}\n`);
              }
            });
          } else {
            console.log(`${element.name} doesn't appear in any movie\n`);
          }
        });
        console.log(line, white(`Page: ${pageNumber}\n`));
        spinner.succeed("Data successfully read from local JSON!");
      } catch (err) {
        spinner.fail("There was an error reading your local data");
        console.log(red(err));
      }
    } else {
      try {
        const res = await getPersons(pageNumber);

        if (save) {
          saveData("persons", JSON.stringify(res.results));
          spinner.succeed("Your data was stored!");
          //   : spinner.fail("There was a problem storing your data");
        } else {
          res.results.forEach((element) => {
            console.log("Person:\n");
            console.log(`ID: ${white(element.id)}`);
            console.log(`Name: ${blue(element.name)}`);

            element.known_for_department === "Acting"
              ? console.log(
                  `Department: ${magenta(element.known_for_department)}`
                )
              : null;

            if (element.known_for.some((element) => element.title)) {
              console.log("Appearing in movies:\n");
              element.known_for.forEach((movie) => {
                if (movie.title !== undefined) {
                  console.log(`\tMovie:`);
                  console.log(`\tID: ${white(movie.id)}`);
                  console.log(`\tRelease Date: ${white(movie.release_date)}`);
                  console.log(`\tTitle: ${white(movie.title)}\n`);
                }
              });
            } else {
              console.log(`${element.name} doesn't appear in any movie\n`);
            }
          });
          console.log(
            line,
            white(`Page: ${pageNumber} of ${res.total_pages}\n`)
          );
          spinner.succeed("Data successfully fetched!");
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

//CALLBACK FUNCTION OPTION

// const request = req(pageNumber, (succeed) => {
//   if (succeed) {
//     spinner.succeed("Data successfully fetched!");
//   } else {
//     spinner.fail("There was an error with the data");
//   }
// });
