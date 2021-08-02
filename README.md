`#node.js` `#master-in-software-engineering`
# node-moviedb-cli

## Table of Contents <!-- omit in toc -->

  - [📔 Description](#-description)
  - [🏁 Getting Started](#-getting-started)
    - [1. clone repository](#1-clone-repository)
    - [2. npm install](#2-npm-install)
    - [3. Create API_KEY](#3-create-api_key)
  - [The Project](#the-project)

  - [3.  Popular persons](#3--popular-persons)
  - [4. Persons details](#4-persons-details)
 
  - [Project requirements](#project-requirements)
  - [✍️ Authors](#️-authors)

</br>

## 📔 Description
- In this project we developed a CLI program with node.js.
- You will be able to run the program using a terminal application. 
- The program is connected to a third-party API(the movie db). 
- We connected the program to a third-party API(https://www.themoviedb.org) to show the data using node.js.


</br>

## 🏁 Getting Started 

### 1. clone repository

First, you will need to `clone` or `fork` the repository into your Github
account:


```
$ git clone https://github.com/assembler-school/node-moviedb-cli.git
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


## The Project

In this project you will build a cli app similar to the following screenshot.

<img src="src/img/app-view.png">

 ### 1.  Popular persons 
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

### 2. Persons details
------------------
  2.1 URL: https://api.themoviedb.org/3/person/:id
  - Required fields:
    - description: "Make a network request to fetch the data of a single person"
    - options:
      - --id (-i) REQUIRED ("The id of the person")
  
  2.2 Start terminal spinner using ora (https://github.com/sindresorhus/ora)

  2.3 Create https request file (https://nodejs.org/api/https.html#https_https_request_options_callback)

  2.4 ERROR HANDLER -> ora.fail()

  2.5 Rendering using chalk

  2.6 Ending the terminal spinner using ora.succeed()


## Requirements

  - GIT
  - Directory structure
  - English comments
  - camelCase
  - Subtasks
  - Delete files not used 

## Deliverables

  - Repository
  - Postman collection
  - README



## Technologies used <!-- omit in toc -->

- `Node.js`
- `eslint`
- `prettier`
- `lint-staged`
- `husky`



## Resources

● Oficial web page: https://nodejs.org/en/docs/<br>
● W3schools: https://www.w3schools.com/nodejs/<br>
● NodeJS Tutorial: https://www.tutorialsteacher.com/nodejs/nodejs-tutorials<br>
● chalk: https://www.npmjs.com/package/chalk<br>
● commander: https://www.npmjs.com/package/commander<br>
● dotenv: https://www.npmjs.com/package/dotenv<br>
● node-notifier: https://www.npmjs.com/package/node-notifier<br>
● ora: https://www.npmjs.com/package/ora/v/0.3.0<br>


## License <!-- omit in toc -->

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details


## ✍️ Authors
Hugo Gomez [@labietelabiete](https://github.com/labietelabiete)<br>
Jon García-Orad [@jonCroatanUto](https://github.com/jonCroatanUto)<br>
Eunyoung Kim [@solaz0824](https://github.com/solaz0824)</br>
