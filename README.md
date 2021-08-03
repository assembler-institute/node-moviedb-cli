
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
`#node.js`  `#master-in-software-engineering` `#javascript` `#API`


<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

  
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

 

<!-- ALL-CONTRIBUTORS-BADGE:END -->

  

# Assembler School: Node.js MovieDB CLI App <!-- omit in toc -->

  

In this project you will learn how to create a cli app with Node.js.
  
>This project is part of the Master in Software Development. The objective was to develop a CLI program developed with node.js that you will be
able to run using a terminal application. The program will have to connect to a
third-party API to show the data returned and store it in the local system.


   ### Main objectives:
● Learn how to connect to a third party API using node.js
● Learn how to implement a CLI program using node.js
● Learn how to work with the filesystem apis of node.js
● Learn how to interact with a CLI program and develop a menu that users can use to know how to execute the program
   


## Index <!-- omit in toc -->
- [Where to start?🚀](#where-to-start)
  - [Install🔧](#install)
  - [Requirements📋](#requirements)
- [Deployment📦](#deployment)
- [How to use 💻](#how-to-use-)
  - [Regular mode](#regular-mode)
    - [Get Movies](#get-movies)
    - [Get a movie with ID](#get-a-movie-with-id)
    - [Get persons](#get-persons)
    - [Get person with ID](#get-person-with-id)
    - [General flags:](#general-flags)
  - [Interactive mode](#interactive-mode)
- [Project structure 📁](#project-structure-)
- [Tools and tecnologies used 🛠️](#tools-and-tecnologies-used-️)
- [Project requirements 📏](#project-requirements-)
	-[Dashboard page](#dashboard-page) 
	-[Employee page](#dashboard-page) 
- [Project structure](#project-structure)
- [Tools and tecnologies used](#tools-and-tecnologies-used)
- [Project requirements](#project-requirements)
- [Based on](#based-on)
  
## Where to start?🚀
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
  
See deployment for notes on how to deploy the project on a live system.
### Install🔧

To clone this repository you have run in terminal:

```sh
git clone https://github.com/mhfortuna/node-moviedb-cli.git
```
After that, run a `npm install` in the root of the project, for all dependencies to install.

### Requirements📋

To run this project you need you need to have *node* and *npm* installed.


## Deployment📦

To run this app just go to the root folder and use:

```sh
 node .\src\moviedb.js
```
You will have to add the commands, options and flags for correct usage.

## How to use 💻

### Regular mode
There are 4 main functionalities:
#### Get Movies
```sh
 node .\src\moviedb.js get-movies
```
With the following options/flags:

-  "--page" (required) to indicate the page
- "-p --popular" for popular movies
- "-n --now-playing" for now playing movies

#### Get a movie with ID
```sh
 node .\src\moviedb.js get-movie
```
With the following options/flags:
- "-i --id" (required) set the id for the movie
- "-r --reviews" get also the reviews for the movie

#### Get persons
```sh
 node .\src\moviedb.js get-persons
```
With the following options/flags:
- "-p --popular" (required) set the id for the movie
-  "--page" (required) to indicate the page

#### Get person with ID
```sh
 node .\src\moviedb.js get-person
```
With the following options/flags:
- "-i --id" (required) set the id for the person

#### General flags:
- "--save" save the fetched data from the API to local file
- "--local" load the data from the local file

### Interactive mode
To use the interactive mode just run

```sh
 node .\src\moviedb.js interactive
```

Then follow the options displayed like this:
```sh
 node .\src\moviedb.js interactive
 
 ? What do you want fetch? (Use arrow keys)
> Popular movies 
  Now playing movies 
  A specific movie 
  Popular persons 
  A specific person 
```
## Project structure 📁

```
├───files // Here we save the downloaded data
│   ├───movies
│   └───persons
└───src // The main controller is located here
    ├───img
    └───utils // All the functionalitiesare here
```

## Tools and tecnologies used 🛠️

* Node.js
* Chalk
* Commander
* DotENV
* Inquirer
* Node-notifier
* Ora
* Visual Studio Code

## Project requirements 📏

● You must use GIT. It is important that the indications and commits are explicit and concrete enough to be able to understand the changes without the need to require additional information as much as possible.
● Create a clear and orderly directory structure
● Both the code and the comments must be written in English
● Use the camelCase code style for defining variables and functions
● In the case of using HTML, never use online styles
● In the case of using different programming languages always define the
implementation in separate terms
● Remember that it is important to divide the tasks into several sub-tasks so
that in this way you can associate each particular step of the construction
with a specific commit
● Delete files that are not used or are not necessary to evaluate the project

  

## License <!-- omit in toc -->

  

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file

for details

  

## Contributors ✨ <!-- omit in toc -->

  
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://nachomontoya.es"><img src="https://avatars.githubusercontent.com/u/73990495?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nacho</b></sub></a><br /><a href="https://github.com/mhfortuna/node-moviedb-cli/commits?author=Nachomontoya" title="Code">💻</a> <a href="#design-Nachomontoya" title="Design">🎨</a> <a href="#ideas-Nachomontoya" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-Nachomontoya" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/Hugo05Duran"><img src="https://avatars.githubusercontent.com/u/80817782?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hugo05Duran</b></sub></a><br /><a href="https://github.com/mhfortuna/node-moviedb-cli/commits?author=Hugo05Duran" title="Code">💻</a> <a href="#design-Hugo05Duran" title="Design">🎨</a> <a href="#ideas-Hugo05Duran" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-Hugo05Duran" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/mhfortuna"><img src="https://avatars.githubusercontent.com/u/66578026?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mathias Fortuna</b></sub></a><br /><a href="https://github.com/mhfortuna/node-moviedb-cli/commits?author=mhfortuna" title="Code">💻</a> <a href="#design-mhfortuna" title="Design">🎨</a> <a href="#ideas-mhfortuna" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-mhfortuna" title="Project Management">📆</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

Thanks goes to these wonderful people

([emoji key](https://allcontributors.org/docs/en/emoji-key)):

  

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore-start -->

<!-- markdownlint-disable -->

<table>

<tr>

<td  align="center"><a  href="http://www.danilucaci.com"><img  src="https://avatars.githubusercontent.com/u/19062818?v=4?s=100"  width="100px;"  alt=""/><br /><sub><b>Dani Lucaci</b></sub></a><br /><a  href="https://github.com/assembler-school/vanilla-js-project-template/commits?author=danilucaci"  title="Code">💻</a> <a  href="https://github.com/assembler-school/vanilla-js-project-template/commits?author=danilucaci"  title="Documentation">📖</a> <a  href="#example-danilucaci"  title="Examples">💡</a> <a  href="#tool-danilucaci"  title="Tools">🔧</a></td>

</tr>

</table>

  

<!-- markdownlint-restore -->

<!-- prettier-ignore-end -->

  

<!-- ALL-CONTRIBUTORS-LIST:END -->

  

This project follows the

[all-contributors](https://github.com/all-contributors/all-contributors)

specification. Contributions of any kind welcome!

