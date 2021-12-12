const chalk = require("chalk");

const log = console.log;

function renderPersonsData(data) {
    log(chalk.white(`\n\n----------------------------------------`));
    log(`Page: ${chalk.white(page)} of: ${chalk.white(23)}`);

    log(chalk.white(`---------------------------------------------`));

    log(`\n${data}`);
    // log(`${chalk.white(`Person:\n${data}`)}`);
    // log(`ID: ${chalk.white(data.id)}`);
    // log(`Name: ${chalk.blue.bold(data.name)}`);

}
//     if (person.known_for_department === "Acting") {
//       log(`Department: ${chalk.magenta(person.known_for_department)}`);
//     }

//     const hasAnyMovieWIthTitle = person.known_for.some(function knownForMovie(
//       movie
//     ) {
//       return movie.title !== undefined;
//     });

//     if (hasAnyMovieWIthTitle) {
//       log(chalk.white(`\nAppearing in movies:`));

//       person.known_for.forEach(function knownFor(movie) {
//         if (movie.title) {
//           log(`\n`);
//           log(`\t${chalk.white(`Movie:`)}`);
//           log(`\tID: ${chalk.white(movie.id)}`);
//           log(`\tRelease Date: ${chalk.white(movie.release_date)}`);
//           log(`\tTitle: ${chalk.white(movie.title)}`);
//           log(`\n`);
//         }
//       });
//     } else {
//       log(`\n`);
//       log(chalk.yellow(`${person.name} doesn’t appear in any movie\n`));
//     }
//   });
// }
module.exports = {
    renderPersonsData,
}