#!/usr/bin/env node
const https = require("https");
require("dotenv").config()
const KEY = process.env.API_KEY;
const { Command } = require("commander");

const program = new Command();
program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .action(function getPersons(options) {
    const fetch =  {
      href: "https://api.themoviedb.org",
      protocol: "https:",
      hostname: "api.themoviedb.org",
      path: `/3/person/popular?page=${options.page}&api_key=${KEY}`,
      method: "GET",
    };
    
    const req = https.request(fetch, (res) => {
      let responseBody = '';
      res.on("data", function onData(chunk) {
        responseBody += chunk;
      });
  
      res.on("end", function onEnd() {
        const data = JSON.parse(responseBody);
        console.log('data:', data);
        
      });
    });
    
    req.on('error', (e) => {
      console.error(e);
    });
    req.end();
  });














program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .action(function getPerson() {
    // code here
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .action(function getMovies() {
    console.log("hello-world");
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .action(function handleAction() {
    console.log("hello-world");
  });

// error on unknown commands

program.parse(process.argv);
