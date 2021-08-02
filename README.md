

`#node.js` `#master-in-software-engineering`

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Assembler School: Node.js MovieDB CLI App <!-- omit in toc -->

In this project you will learn how to create a cli app with Node.js.

## Table of Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
- [The Project](#the-project)
- [Project requirements](#project-requirements)
- [Project delivery](#project-delivery)
- [Resources](#resources)
- [Command Line](#command-line)

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

See deployment for notes on how to deploy the project on a live system.

### The repository

First, you will need to `clone` or `fork` the repository into your Github
account:

<img src="https://docs.github.com/assets/images/help/repository/fork_button.jpg" alt="Fork on GitHub" width='450'>

```
$ git clone https://github.com/assembler-school/node-moviedb-cli.git
```

## Contents and Branches Naming Strategy <!-- omit in toc -->

The repository is made up of several branches that include the contents of each
section.

The branches follow a naming strategy like the following:

- `main`: includes the main contents and the instructions


### Fetching All the Branches

In order to fetch all the remote branches in the repository, you can use the
following command:

```sh
$ git fetch --all
```

### List Both Remote Tracking Branches and Local Branches

```sh
$ git branch --all
```

Then, you can create a local branch based on a remote branch with the following
command:

```sh
$ git checkout -b <new_branch_name> <remote_branch_name>
```

### Installing

First, you will need to install the dependencies with: `npm install`.

Run the following command in your terminal after cloning the main repo:

```sh
$ npm install
```


### Git `precommit` and `prepush` Hooks

In the `assembler-solution` branch you can see an implementation of these tools
if you'd like to use them.

## Deployment <!-- omit in toc -->

In this pill we won't deploy the app.

## Technologies used <!-- omit in toc -->

- `Node.js`
- `eslint`
- `prettier`
- `lint-staged`
- `husky`
- `Commander`
- `Ora`
- `Chalk`


## The Project

In this project we have build an CLI command line using MovieDb's API.


## Command Line 

You are required to use the following command line to execute the projects functions

#### To fetch data

- `./moviedb.js command... ---options... --flags...`
- `OUR OPTIONS`
- Get Persons
 -p, --popular", "Fetch the popular persons"
  --page ''<number>"
- Get Person 
-i, --id <number>", "The id of the person
- Get Movies
-p, --popular", "Fetch the popular movies
-n, --now-playing", "Fetch the movies that are playing now
- Get Movie
-i, --id <number>", "The id of the movie
-r, --reviews", "Fetch the reviews of the movie

--save", "Save the data in a local file
--local", "Read the data from the local file


- You should always help your team members and fellow students of the master so
  that you can all learn together and become better software developers and team
  members
- You must finish all the steps that are marked as `Required`
- Once you are done, you can move on to the optional ones that are marked as
  `Extra 💯`


## Resources

- See the document we provide


## Contributors ✨ <!-- omit in toc -->

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<ul>
	<li>Jonathan Cedeño
	<li>Alvaro Merino 
	<li>Sebastian Brupbacher
</ul>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!