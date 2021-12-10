const https = require('https');
require('dotenv').config();
const BASE_URL = "https://api.themoviedb.org/3";
const popular = "https://api.themoviedb.org/3/person/popular?page=1";
const PORT = process.env.PORT || 3000;
var express = require('express');
var fs = require('fs');
var app = express();

const apiKey = process.env.API_KEY;

var options = {
    host: 'api.themoviedb.org',
    path: '/3/person/popular?page=1',
    method: 'GET',
    ca: apiKey

};
console.log(apiKey);

https.request(options, (res) => {

    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
        process.stdout.write(d);
    });
}).end();

