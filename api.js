const https = require('https');
require('dotenv').config();
const apiKey = process.env.API_KEY;
const ora = require('ora');
const spinner = ora('Loading unicorns').start();

setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'Loading rainbows';
}, 1000);

https.request(`https://api.themoviedb.org/3/movie/76341?api_key=${apiKey}`, (res) => {

    // console.log(`statusCode: ${res.statusCode}`);
    res.on("data", (d) => {
        process.stdout.write(d);
    });
    spinner.stop();
}).end();