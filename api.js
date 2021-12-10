const https = require('https');
require('dotenv').config();
const apiKey = process.env.API_KEY;


https.request(`https://api.themoviedb.org/3/movie/76341?api_key=${apiKey}`, (res) => {

    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
        process.stdout.write(d);
    });
}).end();

