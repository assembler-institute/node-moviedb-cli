const https = require("https");
const chalk = require("chalk");

const {
  API_KEY,
  API_HOSTNAME,
  API_TIMEOUT_REQUEST,
  SECTION_SEPARATOR,
} = require("../utils/constants");

const spinner = require("../components/spinner");

function getPerson({ id }) {
  const options = {
    hostname: API_HOSTNAME,
    port: 443,
    path: `/3/person/${id}?api_key=${API_KEY}`,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (d) => {
      body += d;

      spinner.start("Fetching the person data...\n\n");
    });

    res.on("end", () => {
      // This timeout is to show the loading data spinner
      setTimeout(() => {
        const dataObject = JSON.parse(body);

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
            chalk.white("Biography: ") +
              chalk.bold.blue(dataObject.biography) +
              "\n"
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
              chalk.yellow(
                `${dataObject.name} doesn’t have any alternate names\n`
              )
            );
          }

          // Separator
          console.log(chalk.white(`${SECTION_SEPARATOR}\n\n\n`));

          spinner.stop();
          spinner.succeed("Person data loaded");
        }
      }, API_TIMEOUT_REQUEST);
    });
  });

  req.on("error", (e) => {
    spinner.fail(`Error "${e.code}" (Code ${e.errno})`);
  });

  req.end();
}

module.exports = { getPerson: getPerson };
