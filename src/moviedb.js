import { Command } from "commander";
import createSpinner from "./utils/spinners.js";
import httpsRequest from "./utils/httpsrequests.js";
import dotenv from "dotenv";

dotenv.config();

const program = new Command();
program.version("0.0.1");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )
  .action(function handleAction(info) {
    createSpinner(
      "Fetching the popular person's data...",
      "Popular person's data fetched!",
      "yellow"
    );
    const options = new URL(
      `https://api.themoviedb.org/3/person/popular?page=${info.page}&api_key=${process.env.API_KEY}`
    );
    const response = httpsRequest(options);
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id", "The id of the person")
  .action(function handleAction() {
    createSpinner("Fetching the person's data...", "yellow");
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .requiredOption("--page <number>", "The page of movies data results to fetch")
  .option("-p, --popular", "Fetch the popular movies")
  .option("-n, --now-playing", "Fetch the movies that are playing now")
  .action(function handleAction() {
    createSpinner("Fetching the movies' data...", "yellow");
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id", "The id of the movie")
  .option("-r, --reviews", "Fetch the reviews of the movies")
  .action(function handleAction() {
    createSpinner("Fetching the movie's data...", "yellow");
  });

// error on unknown commands

program.parse(process.argv);
