const https = require("https");
const ora = require("ora");
const fs = require('fs');
const httpConstants = require("./httpConstants.js");
const file = require("./fileReader.js");
const { chalkPeople, chalkPersonId } = require("./chalks.js");

/**
 * get People by Pages
 * @param page: number of page to render
 */
function PersonsByPage(page = 1, option) {
  const options = {
    ...httpConstants,
    path: `/3/person/popular?page=${page}&api_key=${process.env.API_KEY}`,
  };

  const spinner = ora("Loading popular people").start();

  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => {
      if(option) {
        console.log("JSON"); 
        file.savePeople(JSON.parse(body));
        spinner.succeed("Popular Persons data loaded");
      }
      else {
        console.log("REQUEST"); 
        chalkPeople(JSON.parse(body), spinner);
      }
    });
  });

  req.on("error", (e) => spinner.fail(e.message));
  req.end();
}

/**
 * get People by Pages from JSON
 * @param page: number of page to render
 */
function JsonPersonByPage(page = 1) {
  const spinner = ora("Loading popular people").start();

  fs.readFile('./src/utils/json/persons.json', 'utf-8', (err, data) => {
    if (err) {
        spinner.fail(e.message);
        throw err;
    }

    // parse JSON object
    const user = JSON.parse(data.toString());

    // print JSON object
    console.log("LOADED FROM JSON")
    chalkPeople(user, spinner);
    
  });

}

/**
 * Person by ID functions
 */
function PersonById(id) {
  const options = {
    ...httpConstants,
    path: `/3/person/${id}?&api_key=${process.env.API_KEY}`,
  };

  const spinner = ora("Fetching the person data...\n").start();

  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => chalkPersonId(JSON.parse(body), spinner));

  });

  req.on("error", (e) => spinner.fail(e.message));
  req.end();
}

module.exports = { PersonById, PersonsByPage, JsonPersonByPage };
