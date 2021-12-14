const ora = require("ora");
const getPerson = require("./getPersonReq");
const {
  white,
  magenta,
  red,
  line,
  boldBlue,
  gray,
  yellow,
} = require("./chalk");

function spinner(id) {
  const spinner = ora("Fetching the person's data...").start();
  spinner.color = "blue";
  spinner.spinner = "circleHalves";

  setTimeout(async () => {
    try {
      const person = await getPerson(id);

      console.log(line, "Person:\n");
      console.log(`ID: ${white(person.id)}`);
      console.log(`Name: ${boldBlue(person.name)}`);
      console.log(
        `Birthday: ${white(person.birthday)} ${gray("|")} ${white(
          person.place_of_birth
        )}`
      );

      person.known_for_department === "Acting"
        ? console.log(`Department: ${magenta(person.known_for_department)}`)
        : null;

      console.log(`Biography: ${boldBlue(person.biography)}`);

      if (person.also_known_as.length > 0) {
        console.log(white(`\nAlso known as:\n`));
        person.also_known_as.forEach((alias) => {
          console.log(white(alias) + "\n");
        });
      } else {
        console.log(
          `\n${yellow(person.name)} doesn't have any alternative name\n`
        );
      }
      spinner.succeed("Person's data loaded");
    } catch (err) {
      spinner.fail("There was an error with the data");
      console.log(red(err));
    }
    spinner.stop();
  }, 2000);
}

module.exports = spinner;
