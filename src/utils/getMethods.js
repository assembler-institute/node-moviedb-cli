const https = require("https");
const ora = require("ora");

const httpConstants = require("./httpConstants.js");
const { chalkPeople } = require("./chalks.js");

/**
 * get People by Pages
 * @param page: number of page to render
 */
function PersonsByPage(page = 1) {
  const options = {
    ...httpConstants,
    path: `/3/person/popular?page=${page}&api_key=${process.env.API_KEY}`,
  };

  const spinner = ora("Loading popular people").start();

  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => chalkPeople(JSON.parse(body), spinner));
  });

  req.on("error", (e) => spinner.fail(e.message));
  req.end();
}

/**
 * Popular functions
 */
function getPopularPersons() {
  console.log("personas populares como Einar ");
}

/**
 * Person by ID functions
 */
function getPersonById(id) {
  const options = {
    host: "api.themoviedb.org",
    port: 443,
    protocol: "https:",
    path: `/3/person/${id}?&api_key=${process.env.API_KEY}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  const req = https.request(options, (res) => {
    spinner.start('Fetching the person data...\n');
    let body = "";

    res.on("data", (chunk) => {
      body += chunk;
    });

    res.on("end", () => {
      try {
        let person = JSON.parse(body);
        log("____________________________________\nPerson:\n");
        log(`ID: ${person.id} \nName: ${chalk.cyanBright(person.name)} \nBirthday: ${person.birthday} ${chalk.gray("|")} ${person.place_of_birth}`);
        if (person.known_for_department != null) log(`Department: ${chalk.magentaBright(person.known_for_department)}`);
        
        log(`Biography: ${chalk.cyanBright(chalk.bold(person.biography))} \n`);
        
        if (person.also_known_as) { 
          log(`Also known as: \n`);
          person.also_known_as.forEach(element => {
          log(element);
        });
        } else {
          log(`${chalk.yellow(person.name)} doesn’t have any alternate names`)
        }
        log("");
        spinner.succeed('Person data loaded');
      } catch (error) {
        console.error(error.message);
      }
    });
  });

  req.on("error", (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.end();
}

module.exports = { getPersonsByPage, PersonsByPage};
