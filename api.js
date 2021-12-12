const https = require('https');
require('dotenv').config();
const apiKey = process.env.API_KEY;
const url = `https://api.themoviedb.org/3/movie/76341?api_key=${apiKey}`
const req = https.request(url, (res) => {
    res.on("data", (d) => {
        process.stdout.write(d + '\n');
    });
});
req.end()