`#node.js` `#master-in-software-engineering`
# node-moviedb-cli

## Table of Contents <!-- omit in toc -->

- [node-moviedb-cli](#node-moviedb-cli)
  - [Description](#description)
  - [Getting Started](#getting-started)
    - [1. Clone repository](#1-clone-repository)
    - [2. npm install](#2-npm-install)
    - [3. Create API_KEY](#3-create-api_key)
    - [4. Create .env file with API_KEY](#4-create-env-file-with-api_key)
  - [The Project](#the-project)
  - [Requirements](#requirements)
  - [Deliverables](#deliverables)
  - [Technologies used](#technologies-used)
  - [Resources](#resources)
  - [License](#license)
  - [Authors](#authors)

<br>

## Description
- In this project we developed a CLI program with node.js.
- You will be able to run the program using a terminal application. 
- The program is connected to a third-party API(the movie db). 
- We connected the program to a third-party API(https://www.themoviedb.org) to show the data using node.js.


<br>

## Getting Started 

### 1. Clone repository

First, you will need to `clone` or `fork` the repository into your Github
account:


```
$ git clone https://github.com/labietelabiete/node-moviedb-cli.git
```

### 2. npm install 
Then, you will need to install the dependencies with: `npm install`.

Run the following command in your terminal after cloning the main repo:

```sh
$ npm install
```

### 3. Create API_KEY 
- Go to The Movie Database (TMDb) :point_right: https://www.themoviedb.org/signup 
- Sign up and Sign in
- Get your API KEY 

### 4. Create .env file with API_KEY
Include this line below in .env file
```
API_KEY = YOUR API KEY HERE 
```

<br><br>

## The Project

In this project we built a CLI App similar to the following screenshot.

<img src="src/img/app-view.png">

### 1. Popular Persons <!-- omit in toc -->
  ----------------
   1.1  URL: https://api.themoviedb.org/3/person/popular?page=1 
  - Required fields: 
    - description: "Make a network request to fetch the most popular persons"
    - options:
      - --popular (-p) REQUIRED ("Fetch the popular persons")
      - --page (none) (input type: number) REQUIRED ("The page of persons data results to fetch")
  
   1.2 Start terminal spinner using ora (https://github.com/sindresorhus/ora) that renders the following message until the request has finished: "Fetching the popular person's data..."

   1.3 Create https request file (https://nodejs.org/api/https.html#https_https_request_options_callback)

  1.4 ERROR HANDLER -> ora.fail()

  1.5 RENDERING RESULT -> chalk (https://github.com/chalk/chalk)
    - Use chalk.white() method to render pagination
    - Use chalk for rendering persons data
    - If person appears in movies:
        - Use chalk for rendering movies
  
  1.6 Ending the terminal spinner using ora.succeed()

 *Example* :
  ```
  node src/moviedb.js get-persons -p --page 100 
  ```

<br>

### 2. Single Person Details <!-- omit in toc -->
------------------
  2.1 URL: https://api.themoviedb.org/3/person/:id
  - Required fields:
    - description: "Make a network request to fetch the data of a single person"
    - options:
      - --id (-i) REQUIRED ("The id of the person")
  
  2.2 Start terminal spinner using ora (https://github.com/sindresorhus/ora)

  2.3 Create https request file (https://nodejs.org/api/https.html#https_https_request_options_callback)

  2.4 ERROR HANDLER -> ora.fail()

  2.5 Rendering using chalk https://github.com/chalk/chalk

  2.6 Ending the terminal spinner using ora.succeed()


*Example* :
```
node src/moviedb.js get-person --id 1245
```
<br>
### 3. Movies <!-- omit in toc -->
-------------------
  3.1 URL: https://api.themoviedb.org/3/movie/popular?page=1
  - Required fields:
    - description: "Make a network request to fetch movies"
    - options:
      - --page (none) (input type: number) REQUIRED ("The page of movies data results to fetch")
      - --popular (-p) ("Fetch the popular movies")
      - --now-playing (-n) ("Fetch the moviews that are playing now")
  

  3.2 Start terminal spinner using ora (https://github.com/sindresorhus/ora)

  3.3 Create https request file (https://nodejs.org/api/https.html#https_https_request_options_callback)

  3.4 ERROR HANDLER -> ora.fail()

  3.5 Rendering using chalk https://github.com/chalk/chalk

  3.6 Ending the terminal spinner using ora.succeed()
  - if the request was made to the popular movies endpoint: 
     - "Popular movies data loaded"
  - if the request was made to the popular movies endpoint: 
    - "Movies playing now data loaded"

*Example* :
  - popular movies  
  ```
  node src/moviedb.js get-movies --page 6
  ```
  - now playing movies 
  ```
  node src/moviedb.js get-movies -n --page 1 
  ```
  <br>

### 4. Single Movie Details <!-- omit in toc -->
-----------------------
4.1 URL: https://api.themoviedb.org/3/movie/:movieId
- Required fields:
    - description: "Make a network request to fetch the data of a single movie"
    - options:
      - --id (-i) REQUIRED ("The id of the movie")
      - reviews (-r) ("Fetch the reviews of the movie")
  
4.2 Start terminal spinner using ora (https://github.com/sindresorhus/ora)

4.3 Create https request file (https://nodejs.org/api/https.html#https_https_request_options_callback)

4.4 ERROR HANDLER -> ora.fail()

4.5 Rendering using chalk https://github.com/chalk/chalk

4.6 Ending the terminal spinner using ora.succeed()

*Example* :

  ```
node src/moviedb.js get-movie  --id 385128
```
or
```
node src/moviedb.js get-movie  -i 385128 --review
  ```
<br><br>

## Requirements

  - GIT
  - Directory structure
  - English comments
  - camelCase
  - Subtasks
  - Delete files not used 
<br><br>
## Deliverables

  - Repository
  - Postman collection
  - README
<br><br>

## Technologies used

- `Node.js`
- `eslint`
- `prettier`
- `lint-staged`
- `husky`
<br><br>

## Resources

- Oficial web page: https://nodejs.org/en/docs/<br>
- W3schools: https://www.w3schools.com/nodejs/<br>
- NodeJS Tutorial: https://www.tutorialsteacher.com/nodejs/nodejs-tutorials<br>
- chalk: https://www.npmjs.com/package/chalk<br>
- commander: https://www.npmjs.com/package/commander<br>
- dotenv: https://www.npmjs.com/package/dotenv<br>
- node-notifier: https://www.npmjs.com/package/node-notifier<br>
- ora: https://www.npmjs.com/package/ora/v/0.3.0<br>
<br>

## License 

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details

<br>

## Authors

Hugo Gomez [@labietelabiete](https://github.com/labietelabiete)<br>
Jon García-Orad [@jonCroatanUto](https://github.com/jonCroatanUto)<br>
Eunyoung Kim [@solaz0824](https://github.com/solaz0824)
