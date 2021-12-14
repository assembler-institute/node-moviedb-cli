const { getPersonsByPage, getPersonById } = require("./httpServices");
const ora = require("ora");
const chalk = require("chalk");

async function requestPersonsByPage(page) {
  const spinner = ora("Fetching the popular person's data...").start();
  try {
    const data = await getPersonsByPage(page);

    for (let i = 0; i < data.results.length; i++) {
      console.log(chalk.white("------------------------------------------"));
      console.log(`\n`);
      console.log(chalk.white("Person:"));
      console.log(`\n`);
      console.log(`ID: ${data.results[i].id}`);
      console.log(`Name: ${chalk.bold.blue(data.results[i].name)}`);

      data.results[i].known_for_department === "Acting"
        ? console.log(
            "Department: " + chalk.magenta(data.results[i].known_for_department)
          )
        : null;
      if (data.results[i].known_for.length > 0) {
        for (let m = 0; m < data.results[i].known_for.length; m++) {
          console.log(`\n`);
          console.log(chalk.white(`\t` + "Movie:"));
          console.log(
            chalk.white(
              `\t` + `ID:  ${chalk.white(data.results[i].known_for[m].id)}`
            )
          );
          console.log(
            chalk.white(
              `\t` +
                `Release date:  ${chalk.white(
                  data.results[i].known_for[m].release_date
                )}`
            )
          );
          console.log(
            chalk.white(
              `\t` +
                `Title:  ${chalk.white(data.results[i].known_for[m].title)}`
            )
          );
          console.log(`\n`);
        }
      } else {
        console.log(
          `${chalk.bold(data.results[i].name)} doesn’t appear in any movie \n`
        );
      }
    }
    if (data.page < data.total_pages) {
      console.log(chalk.white("------------------------------------------"));
      console.log(chalk.white(`Page: ${data.page} of: ${data.total_pages}`));
    }
    spinner.succeed("Popular Persons data loaded");
  } catch (err) {
    console.log(err);
    spinner.fail("Popular Persons data load fails");
  }
}

async function requestPersonById(id) {
  const spinner = ora("Fetching the person data...").start();
  try {
    const data = await getPersonById(id);

    console.log(chalk.white("------------------------------------------"));
    console.log(`\n`);
    console.log(chalk.white("Person:"));
    console.log(`\n`);
    console.log(`ID: ${chalk.white(data.id)}`);
    console.log(`Name: ${chalk.bold.blue(data.name)}`);
    console.log(
      `Birthday: ${chalk.white(data.birthday)} ${chalk.gray("|")}${chalk.white(
        data.place_of_birth
      )}`
    );
    data.known_for_department === "Acting"
      ? console.log("Department: " + chalk.magenta(data.known_for_department))
      : null;
    console.log(`Biography: ${chalk.bold.blue(data.biography)}`);
    if (data.also_known_as.length > 0) {
      console.log(`\n`);
      console.log(chalk.white("Also known as:"));
      console.log(`\n`);
      data.also_known_as.forEach((element) => {
        console.log(element);
      });
    } else {
      console.log(
        `${chalk.yellow(data.name)} doesn’t have any alternate names \n`
      );
    }

    spinner.succeed("Person data loaded");
  } catch (err) {
    console.log(err);
    spinner.fail("Person data load fails");
  }
}
module.exports = {
  requestPersonsByPage: requestPersonsByPage,
  requestPersonById: requestPersonById,
};
