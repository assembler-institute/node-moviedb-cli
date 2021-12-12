//-----------------------------------required-------------------------------------------------------
require('dotenv').config();
const ora = require('ora');
const https = require('https');
const chalk = require("chalk");
const { renderPersonsData } = require("./outputsMetods.js");
//------------------------------------#########-----------------------------------------------------

const apiKey = process.env.API_KEY;


function connectApi(page) {
    const url = `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=${page}`
    const req = https.request(url, (res) => {
        res.setEncoding('utf8');
        res.on("data", (data) => {
            // ora(' Fetching the popular person\'s data...').start()
            renderPersonsData(data)
                // ora().succeed("finish");
                // ora().stopAndPersist();
        });
    });
    req.end()
}
module.exports = {
    connectApi,
}