#!/usr/bin/env node

const { Command } = require("commander");
const ora = require("ora");
const dotenv = require("dotenv");
dotenv.config();

const chalk = require("chalk");

const { getPersons, getPerson, getMovies, getMovie } = require("./utils/httpsRequest");

const requestOptions = {
  href: "https://api.themoviedb.org",
  protocol: "https:",
  hostname: "api.themoviedb.org",
  path: ``,
  // path: `/3/person/popular?page=1&api_key=f599dfd0f0fe1ae38c4420cd239f2cd2`,
  port: 443,
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};

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
  .action(async function handleAction(programOptions) {
    const spinner = ora("Fetching the popular person's data...").start();
    console.log("hello-world");

    requestOptions.path = `/3/person/popular?page=${programOptions.page}`;
    data = await getPersons(requestOptions);
    // console.log(persons);

    data.results.forEach((person) => {
      console.log(
        `PERSON: 
    
    ID: ${person.id}
    Name: ${chalk.bold.blue(person.name)}
    Departament: ${chalk.magenta(person.known_for_department)}\n\n`
      );

      person.known_for.forEach((movies) => {
        if (movies.original_title == undefined) {
          console.log(`${chalk.yellow.dim("There's no movive ")}`);
        } else {
          console.log(
            `\tMovie:
        \tID: ${chalk.green(movies.id)}
        \tRelease Date: ${chalk.green(movies.release_date)}
        \tTitle: ${chalk.green(movies.original_title)}`
          );
        }
      });

      console.log(
        `--------------------------------------------------------\n\n`
      );
    });

    spinner.succeed("Popular persons data loaded");
  });

/*
************ test it with **************

node src/moviedb.js get-person -i 990393    

or

node src/moviedb.js get-person -i 1245 
*/
program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id", "The page of persons data results to fetch")
  .action(async function handleAction(programOptions) {
    const spinner = ora("Fetching the person's data...").start();
    const id = programOptions.args.toString();
    requestOptions.path = `/3/person/${id}`;
    data = await getPerson(requestOptions);
    console.log(
      chalk.white(
        `\n-----------------------------------------------------------------`
      )
    );
    console.log(chalk.white("Person:\n"));
    console.log(chalk.white("ID: ", data.id));
    console.log("Name: ", chalk.blue(data.name));
    console.log(
      chalk.white("Birthday: ", data.birthday),
      chalk.gray("|"),
      chalk.white(data.place_of_birth)
    );
    if (data.known_for_department === "Acting") {
      console.log("Department: ", chalk.magenta(data.known_for_department));
    } else {
      console.log("");
    }
    console.log("Biography: ", chalk.bold.blue(data.biography));
    if (data.also_known_as) {
      console.log(`\n`);
      console.log(chalk.white("Also known as: \n"));
      data.also_known_as.map((name) => console.log(chalk.white(name)));
      console.log(`\n`);
    } else {
      console.log(`\n`);
      console.log(
        chalk.yellow(data.name),
        "doesn't have any alternate names\n"
      );
    }
    spinner.succeed("Person data loaded");
  });

/*
************ test it with **************
1. popular movies : 
node src/moviedb.js get-movies --page 6
2. now playing movies : 
node src/moviedb.js get-movies -n --page 1 
*/

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .requiredOption("--page", "The page of movies data results to fetch")
  .option("-p, --popular", "Fetch the popular movies")
  .option("-n, --now-playing", "Fetch the movies that are playing now")
  .action(async function handleAction(programOptions) {
    const spinner = ora("Fetching the movies data...").start();
    const page = programOptions.args.toString();
    let data = "";

    function renderMovies(msg) {
      console.log(
        chalk.white(
          `\n-----------------------------------------------------------------`
        )
      );
      console.log("Page: ", chalk.white(data.page, " of ", data.total_pages));
      data.results.map((movie) => {
        console.log(
          chalk.white(
            `\n-----------------------------------------------------------------\n`
          )
        );
        console.log(chalk.white("Movie:\n"));
        console.log("ID: ", chalk.white(movie.id));
        console.log("Title: ", chalk.bold.blue(movie.title));
        console.log("Release Date: ", chalk.white(movie.release_date, "\n"));
      });
      spinner.succeed(msg);
    }

    if (
      programOptions.popular ||
      (!programOptions.popular && !programOptions.nowPlaying)
    ) {
      requestOptions.path = `/3/movie/popular?page=${page}`;
      data = await getMovies(requestOptions);
      renderMovies("Popular movies data loaded");
    } else if (programOptions.nowPlaying) {
      requestOptions.path = `/3/movie/now_playing?page=${page}`;
      data = await getMovies(requestOptions);
      renderMovies("Movies playing now data loaded");
    }
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i <number>","The id of the movie")
  .option("-r","Fetching the reviws of the movie")
  .action(async function handleAction(programOptions) {
    const spinner= ora("Fetching movie data...").start();
    const id = programOptions.i.toString();
    if(programOptions.r){
      requestOptions.path = `/3/movie/${id}/reviews`;
    }else{
      requestOptions.path = `/3/movie/${id}`;
    }  
    data = await getMovie(requestOptions);
    
    function renderMovie(){
      console.log(data);
    }
    renderMovie();
    spinner.succeed("movie loaded");
  });

// error on unknown commands

program.parse(process.argv);
