//-----------------------------------required-------------------------------------------------------
require('dotenv').config();
const ora = require('ora');
const https = require('https');
const chalk = require("chalk");
const { renderData } = require("./outputsMetods.js");

//------------------------------------#########-----------------------------------------------------

const apiKey = process.env.API_KEY;


function connectApi(page) {
    const url = `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${page}`;
    const req = https.request(url, (res) => {
        const spinner = ora("Fetch the popular persons...").start();
        let data = "";
        res.setEncoding('utf8');
        res.on("data", (d) => {
            data += d;
        });
        res.on("end", () => {
            let obj = JSON.parse(data);
            renderData(page, obj)
        })
        spinner.succeed("completed")
    })
    req.end()

}
module.exports = {
    connectApi,
}