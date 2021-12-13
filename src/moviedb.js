#!/usr/bin/env node
const chalk = require('chalk');
const https = require('https');
require('dotenv').config();
const apiKey = process.env.API_KEY;
const ora = require('ora');
const spinner = ora(' Fetching the person data...').start();

const { Command } = require("commander");
const { url } = require('inspector');
const { options } = require('node-notifier');
const req = require('express/lib/request');
const testRender = require('../render/person');


const program = new Command();

setTimeout(() => {
  spinner.color = 'yellow';
  spinner.text = 'Loading rainbows';
}, 1000);

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = `api_key=${apiKey}`;

// const query = https.request(`https://api.themoviedb.org/3/movie/76341?api_key=${apiKey}`, (res) => {

//   console.log(`statusCode: ${res.statusCode}`);
//   res.on("data", (d) => {
//     process.stdout.write(d);
//   });
//   spinner.stop();
// }).end();


program.version("0.0.1")

program

  .command("get-persons")

  .description("Make a network request to fetch most popular persons")

  .action(function handleAction() {

    console.log("hello-world");

  });



program

  .command("get-person")

  .description("Make a network request to fetch the data of a single person")

  .option("-i, --id <id>", "The id of the person")

  .action(function handleAction(options) {
    const requestURL = `${BASE_URL}person/${options.id}?${API_KEY}`;

    https.request(requestURL, (res) => {
      console.log(chalk.white("\n----------------------------------------"))
      res.setEncoding('utf8');
      res.on("data", (d) => {
        const obj = JSON.parse(d);
        // console.log(obj);
        console.log(testRender.renderPerson(obj));


        spinner.succeed('Successfully fetched data');
      });
      spinner.stop();
    }).end();
    req.on("error", (e) => {
      ora.fail(e.message);
    });
  });


program

  .command("get-movies")

  .description("Make a network request to fetch movies")

  .action(function handleAction() {

    console.log("hello-world");

  });

program

  .command("get-movie")

  .description("Make a network request to fetch the data of a single person")

  .action(function handleAction() {

    console.log(query);

  });

program

  .option("-v, --verbose", "A value indicating whether output should be verbose")


// error on unknown commands



program.parse(process.argv);