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
    const dir = './src/utils/movies';
    let path = './src/utils/movies/popular-movies.json';
    
    if (flag) path = './src/utils/movies/now-popular-movies.json';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
    fs.writeFileSync(path, JSON.stringify(page) , 'utf-8');
}

module.exports = { savePeople, saveMovies };