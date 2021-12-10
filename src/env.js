require('dotenv').config();

const http = require("http");

const KEY = process.env.API_KEY;

const PORT = process.env.PORT;

let server = http.createServer((req, res) => {
  
})