const fs = require('fs');

function savePeople(page) {
    const path = './src/utils/persons/popular-persons.json';
    const dir = './src/utils/persons';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
    fs.writeFileSync(path, JSON.stringify(page) , 'utf-8');

}

function saveMovies(page, flag) {
    const path = './src/utils/movies/popular-movies.json';
    const nowPath = './src/utils/movies/now-popular-movies.json';
    const dir = './src/utils/movies';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
    if (flag) fs.writeFileSync(nowPath, JSON.stringify(page) , 'utf-8');
    else fs.writeFileSync(path, JSON.stringify(page) , 'utf-8');
}

module.exports = { savePeople, saveMovies };