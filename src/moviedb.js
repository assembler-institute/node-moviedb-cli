#!/usr/bin/env node

const { Command } = require("commander");

const ora = require("ora");
const dotenv = require("dotenv");
dotenv.config();
const https = require('https');

// const options = {
//   hostname: ' https://api.themoviedb.org',
//   port: 443,
//   path: '/',
//   method: 'GET',
  
// };
const options ={
  href: "https://api.themoviedb.org",
protocol: "https:",
hostname: "api.themoviedb.org",
path: `/3/person/popular?page=1&api_key=f599dfd0f0fe1ae38c4420cd239f2cd2`,
port: 443,
method: "GET",
headers: {
"Content-Type": "application/json",
//Authorization: `f599dfd0f0fe1ae38c4420cd239f2cd2`,
}
}

//3/person/popular?page=1&api_key=f599dfd0f0fe1ae38c4420cd239f2cd2'
const program = new Command();
program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page, <number>",
    "The page of persons data results to fetch"
  )
  .action(function handleAction() {
    const spinner = ora("Fetching the popular person's data...").start();
    console.log("hello-world");

    const req = https.request(options, (req,res) => {
       //console.log("this is res: ",req);
      // console.log('statusCode:', res.statusCode);
       //console.log('headers:', res.headers);
       let data = '';
       req.on('data', chunk => {
         data += chunk;
         console.log(JSON.stringify(data));
       })
      
      req.on('data', (d) => {
        console.log(d);
        //process.stdout.write(d);
      });
    });
    
    req.on('error', (e) => {
      console.error(e);
    });
    req.end();

    spinner.succeed("Popular persons data loaded");
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id", "The page of persons data results to fetch")
  .action(function handleAction() {
    const spinner = ora("Fetching the person's data...").start();
    console.log("hello-world");
    spinner.succeed("Person data loaded");
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
    console.log("hello-world");
  });

// error on unknown commands

program.parse(process.argv);
