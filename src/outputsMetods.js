const chalk = require("chalk");

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
    renderData,
}