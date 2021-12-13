//-----------------------------------required-------------------------------------------------------
require('dotenv').config();
const ora = require('ora');
const https = require('https');
const testRender = require('../render/person');
// -----------------------------------constants-------------------------------------------------------
const BASE_URL = 'https://api.themoviedb.org/3/';
const apiKey = process.env.API_KEY;
const API_KEY = `api_key=${apiKey}`;
//------------------------------------#########-----------------------------------------------------




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
            testRender.renderData(page, obj)
        })
        spinner.succeed("completed")
    })
    req.end()

}




function getPerson(id) {
    const requestURL = `${BASE_URL}person/${id}?${API_KEY}`;

    https.request(requestURL, (res) => {
        const spinner = ora(' Fetching the person data...').start();
        res.setEncoding('utf8');
        res.on("data", (d) => {
            const obj = JSON.parse(d);
            // console.log(obj);
            console.log(testRender.renderPerson(obj));
            spinner.succeed('Successfully fetched data');
        });
        spinner.stop();
    }).end();
    // req.on("error", (e) => {
    //     ora.fail(e.message);
    // })
};

module.exports = {
    connectApi,
    getPerson,
}