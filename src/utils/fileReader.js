const fs = require('fs');

function savePeople(page) {
    const dir = './src/utils/persons';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
    fs.writeFileSync('./src/utils/persons/persons.json', JSON.stringify(page) , 'utf-8');

}

function saveMovies(page, flag) {
    const dir = './src/utils/movies';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
    fs.writeFileSync('./src/utils/movies/movies.json', JSON.stringify(page) , 'utf-8');
}

module.exports = { savePeople, saveMovies };