#!/usr/bin/env node

//const { Command } = require("commander");
import { Command } from "commander";
import https from "https";
import createSpinner from "./utils/spinners.js";
import dotenv from "dotenv";

dotenv.config();

const program = new Command();
program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  /*.requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )*/
  .action(function handleAction() {
    createSpinner("Fetching the popular person's data...", "yellow");
    const options = {
      hostname: "https://api.themoviedb.org",
      port: 443,
      path: `/3?key=${process.env.API_KEY}`,
      method: "GET",
    };
    const req = https.request(
      `https://api.themoviedb.org/3?key=${process.env.API_KEY}`
    );
    console.log(req);
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .action(function handleAction() {
    console.log("hello-world");
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
