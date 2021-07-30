const fs = require('fs');

function savePeople(page) {
    fs.writeFileSync('./src/utils/json/persons.json', JSON.stringify(page) , 'utf-8');
}

module.exports = { savePeople };