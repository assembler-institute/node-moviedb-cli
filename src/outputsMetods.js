const chalk = require("chalk");

const log = console.log;

function renderPersonsData(data, page) {
    log(chalk.white(`\n\n----------------------------------------`));
    log(`Page: ${chalk.white(page)} of: ${chalk.white(23)}`);

    log(chalk.white(`---------------------------------------------`));

    log(`\n${data[1]}`);
}
module.exports = {
    renderPersonsData,
}