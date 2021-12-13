const log = console.log;
const chalk = require('chalk');

function renderMovies(page, obj) {
    const items = obj.results
    console.log(`\n${chalk.white('Movie:')}`);
    items.forEach(el => {

        log(`ID: ${chalk.white(el.id)} `);
        log(`Title: ${chalk.bold.blue(el.original_title)} `);
        log(`Release Date: ${chalk.white(el.release_date)} `);

        if (el.known_for_department) {
            log(`${chalk.white(`Department:${chalk.magenta(el.known_for_department)}`)} `);
        }
    });

    log(chalk.white(`\n\n----------------------------------------`));
    log(`Page: ${chalk.white(page)} of: ${chalk.white(obj.total_pages)} `);

    log(chalk.white(`--------------------------------------------- `));
}

module.exports = {
    renderMovies,
}