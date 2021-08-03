const chalk = require("chalk");

const { SECTION_SEPARATOR } = require("../../utils/constants");

const spinner = require("../../components/spinner");

function printGetPersonInformation(dataObject) {
  if (dataObject.success == false) {
    spinner.fail(dataObject.status_message);
  } else {
    // Separator
    console.log(chalk.white(`${SECTION_SEPARATOR}\n`));

    // Title person
    console.log(chalk.white("Person:\n"));

    // ID property
    console.log(chalk.white(`ID: ${dataObject.id}`));

    // Name property
    console.log(`Name: ${chalk.bold.blue(dataObject.name)}`);

    // Birthday property
    console.log(
      chalk.white(`Birthday: ${dataObject.birthday}`) +
        chalk.gray(" | ") +
        chalk.white(dataObject.place_of_birth)
    );

    // known_for_department property
    if (dataObject.known_for_department == "Acting") {
      console.log(
        `Department: ${chalk.magenta(dataObject.known_for_department)}`
      );
    }

    //Biography poperty
    console.log(
      chalk.white("Biography: ") + chalk.bold.blue(dataObject.biography) + "\n"
    );

    //Also_known_as section
    if (dataObject.also_known_as.length > 0) {
      console.log(chalk.white("Also known as:\n"));

      dataObject.also_known_as.forEach((name) => {
        console.log(chalk.white(name));
      });

      console.log("");
    } else {
      console.log(
        chalk.yellow(`${dataObject.name} doesn’t have any alternate names\n`)
      );
    }

    // Separator
    console.log(chalk.white(`${SECTION_SEPARATOR}\n\n\n`));

    // Operation succeed
    spinner.succeed("Person data loaded");
  }
}

module.exports = {
  printGetPersonInformation: printGetPersonInformation,
};
