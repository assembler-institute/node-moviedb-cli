const chalk = require('chalk');

function renderPerson(obj) {
    console.log(chalk.white("\n----------------------------------------"))
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


const log = console.log;

function renderData(page, obj) {
    const items = obj.results
    items.forEach(el => {

        log(`Name: ${chalk.blue.bold(el.name)}`);
        log(`ID: ${chalk.white(el.id)}`);
        if (el.known_for_department) {
            log(`${chalk.white(`Department:${chalk.magenta(el.known_for_department)}`)}`);
        }
    });

    log(chalk.white(`\n\n----------------------------------------`));
    log(`Page: ${chalk.white(page)} of: ${chalk.white(obj.total_pages)}`);

    log(chalk.white(`---------------------------------------------`));

}

module.exports = {
    renderPerson,
    renderData,
}