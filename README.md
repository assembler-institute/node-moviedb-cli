`#cli` `#js` `#moviedb` `#master-in-software-engineering`

# Node MovieDB <!-- omit in toc -->

> This repo contains a CLI app built to check MovieDb API using Commander to send instructions via the command line.

## Index <!-- omit in toc -->

- [Project key points](#project-key-points)
- [Directory structure](#directory-structure)
- [Installation](#installation)
  - [Requirements](#requirements)
  - [Node modules](#node-modules)
- [Usage](#usage)
- [Miscellaneous](#miscellaneous)
- [Resources](#resources)
- [TODO](#todo)
- [Bugs](#bugs)
- [Contributors](#contributors)

## Project key points

1. Get used to Node.js functionaliry.
2. Practice with building CLI app from scratch.
3. Get used to environment variables.
4. Make API requests (https).
5. Manage new dependencies.

## Directory structure

Basic schema of how folders are arranged inside this project.

```bash

repo
 ├── node_modules
 ├── .gitignore
 ├── .env
 ├── assets
 ├── assets
 │     ├── js
 │     │    ├── asciiPropmt.js
 │     │    ├── chalk.js
 │     │    ├── helpers.js
 │     │    └── render.js
 │     └── img
 ├── requests.js
 └── moviedb.js

```

- `.env`: environment variable (API_KEY).
- `assets`: js secondary files & images.
- `requiests.js`: requests to MovieDb API.
- `moviedb.js`: entry point.

## Installation

There we go with a few things you must set-up before using this CLI app.

### Place to be

Given the current functionality, keep in mind that **you should be on `src` folder to run the app**.

### Requirements

First of all you should check if you have Node.js installed in your computer:

```bash
node --version
```

If you get a version in response, you are done with it. Otherwise, you can go ahead and [download NodeJS](https://nodejs.org/en/download/), preferably on version `v14.16.0`.

### Environment variable (API key)

The main puropose to use environment variables in this project is to avoid sharing a personal key with the rest of the users of this app. A **very important step** you should make is **register in [MovieDB](https://www.themoviedb.org/) website and get an API key**.

Then, all you'll need to create is a file named `.env` (which .gitignore will ignore) and declare the variable like so:

```bash
API_KEY=123456789123456789123456789
```

### Node modules

All set with NodeJs, then! Now we just need to install all dependencies that our app will use (Commander, Ora, Node-Notifier,…). All of them are already declared in our `package.json` file, so you don't have to worry about them or what version you'll need, all is set.

To install all dependencies you can do it like so:

```bash
npm install
```

## Usage

This CLI app is based on **4 main commands** with their options that interact with MovieDb API to make requests and return data that you can choose to either show on your prompt or save in your computer as a `.json` file.

### Commands

**Get persons** gets a list of popular actors/actresses with a given page. Both `-p, --popular` and `--page <number>` options are required.

```bash
node moviedb.js get-persons --page 34 -p
```

**Get person** gets a singular person with a given id using the given `-i, --id <number>` option.

```bash
node moviedb.js get-person --id 25
```

**Get movies** gets a list of popular movies with a given page. The `--page <number>` option is required while `-p` and `-n` are optional. `-p` returns popular movies while `-n` return those that now are being played.

```bash
node moviedb.js get-movies --page 124 -p
node moviedb.js get-movies --page 396 -n
```

**Get movie** gets a singular movie with a given id using the given `-i, --id <number>` option. An extra functionality with this command is calling `-r, --reviews` option, that will return all reviews on that movie if there are.

```bash
node moviedb.js get-movie --id 47 -p
```

### options

**Save** will save a json file with the response received from the API in any of the previously explained commands with the given `-s, --save` option. The

If you are using either `get-persons` or `get-person` your file will be placed inside `src/resources/persons`. If you are using `get-movies` or `get-movie` your resultant file will be saved inside `src/resources/movies`.

Don't worry if you don't see the folder `resources`, `persons` or `movies`, the app will check if it exists before creating it.

```bash
node moviedb.js get-person --id 45 --save

```

**Help** will display all commands and options if used at `moviedb.js` level while it will show all options of a singular command at a command level:

```bash
// Program level
node moviedb.js --help

// Command level
node moviedb.js get-persons --help
```

### Schema

App commands and options

```bash
Options:
  -V, --version          output the version number
  -s, --save             Save request to file
  -h, --help             display help for command

Commands:
  get-persons [options]  Make a network request to fetch most popular persons
  get-person [options]   Make a network request to fetch the data of a single person
  get-movies [options]   Make a network request to fetch movies
  get-movie [options]    Make a network request to fetch the data of a single person

```

Commands options

```bash
// Get persons
--page <num>   The page of persons data results to fetch
-p, --popular  Fetch the popular persons
-h, --help     display help for command

// Get person
-i, --id <personId>  The id of the person
-h, --help           display help for command

// Get movies
--page <num>      The page of movies data results to fetch
-p, --popular     Fetch the popular movies
-n, --nowPlaying  Fetch the movies that are playing now
-h, --help        display help for command

// Get movie
-i, --id <num>  The id of the movie data result to fetch
-r, --reviews   Fetch the reviews of the movie
-h, --help      display help for command
```

## Miscellaneous

CLI are a nice playground to go back to those 80's aesthetic given by ASCII art and that's why wanted not to miss the opportunity and make this reference.

We've build a dynamic header for all commands that displays a cinema tape with a different message in each case built inside `asciiPrompt.js`. Feel free to test it and play around with both messages and colors since it is also using chalk dependency!

```bash

] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [

    S        P        A        M        A        L        O        T

] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [] [
________________________________________________________________________
```

## Built with

\* NodeJs

\* CLI

## Resources

### Docs 👀

- [Node.js Documentation](https://nodejs.org/dist/latest-v14.x/docs/api/)
- [Node.js FileSystem/fs Documentation](https://nodejs.org/docs/latest-v14.x/api/fs.html)
- [Make directory (fs.mkDirSync())](https://nodejs.org/docs/latest-v14.x/api/fs.html#fs_fs_mkdirsync_path_options)
- [Open file (fs.openFileSync())](https://nodejs.org/docs/latest-v14.x/api/fs.html#fs_fs_opensync_path_flags_mode)
- [Append content to file (fs.mkDirSync())](https://nodejs.org/docs/latest-v14.x/api/fs.html#fs_fs_appendfile_path_data_options_callback)
- [Check existance of file/directory (fs.existSync())](https://nodejs.org/docs/latest-v14.x/api/fs.html#fs_fs_existssync_path)
- [HTTP requests (https())](https://nodejs.org/docs/latest-v14.x/api/https.html)

### Others

- [Handling errors in promises](https://javascript.info/promise-error-handling)

## Dependencies

- [Node notifier](https://www.npmjs.com/package/node-notifier)
- [Commander](https://www.npmjs.com/package/commander)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Chalk](https://www.npmjs.com/package/chalk)
- [Ora](https://www.npmjs.com/package/ora)

## TODO 🤝

- Add `--local` to fecth local file.
- Add more ASCII magic.

## Bugs 🚨

- Ora won't stop on `get-movie --id <id> -r` when error in request.
- Small jump when in root folder.

## Contributors ✨

👤 [Marc Solà](https://github.com/haykbit)

👤 [Oriol Alfambra](https://github.com/haykbit)

👤 [Ricard Garcia](https://github.com/Ricard-Garcia)
