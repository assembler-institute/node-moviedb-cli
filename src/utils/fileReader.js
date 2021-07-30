const fs = require('fs');

function savePeople(page) {
    /*fs.writeFile('./src/utils/json/persons.json', page, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('Lyric saved!');
    });*/
    fs.writeFileSync('./src/utils/json/persons.json', JSON.stringify(page) , 'utf-8');
}

module.exports = { savePeople };