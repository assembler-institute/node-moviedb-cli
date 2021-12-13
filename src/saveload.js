const fs = require("fs");
const path = require("path");


function savePersons(data) {
    const filePath = 'persons.json';
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
}

function saveMovies(data) {
    const filePath = 'movies.json';
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
}


function load(file) {

    const data = fs.readFileSync(file, "utf8");
    console.log(JSON.parse(data));
}

module.exports = {
    savePersons,
    saveMovies,
    load,
}