const chalk = require('chalk');

function renderPerson(obj) {
    let aggregateString = chalk.white(`\nID: ${obj.id}`)
    aggregateString += chalk.bold.blue(`\nName: ${obj.name}`)
    aggregateString += chalk.white(`\nBirthday: ${obj.birthday} ${chalk.grey('|')} ${chalk.white(obj.place_of_birth)}`)
    aggregateString += obj.known_for_department === "Acting" ? chalk.magenta(`\nDepartment: ${obj.known_for_department}`) : "";
    aggregateString += chalk.blue(`\n${obj.biography}`);

    if (obj.also_known_as) {
        aggregateString += chalk.white(`\nAlso known as:\n`);
        obj.also_known_as.forEach(element => {
            aggregateString += chalk.white(`\n${element}`);
        });

    } else {
        aggregateString += chalk.white(`\n${obj.name} doesn't have any alternate names\n`)
    }
    return aggregateString;
}

module.exports = {
    renderPerson,
}