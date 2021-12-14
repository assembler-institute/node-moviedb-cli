import chalk from "chalk";

export default function printInfo(obj, requestType) {
  if (requestType === "getPersons") {
    if (!(obj.page < obj.total_pages)) return;

    console.log(
      chalk.white(`
    \n
    ----------------------------------------\n
    Page: ${obj.page} of: ${obj.total_pages}`)
    );

    obj.results.forEach((person) => {
      console.log(chalk.white("----------------------------------------\n"));
      console.log(chalk.white("PERSON:\n"));
      console.log(chalk.white(`ID: ${person.id}`));
      console.log(`Name: ${chalk.bold.blue(person.name)}`);
      person.known_for_department === "Acting"
        ? console.log(
            `Department: ${chalk.magenta(person.known_for_department)}`
          )
        : null;
      console.log("Appearing in movies:");

      let moviesWithTitle = 0;
      person.known_for.forEach((production) => {
        if (!production.title) return;

        moviesWithTitle++;
        console.log("\n");
        console.log(`\t${chalk.white("Movie:")}`);
        console.log(`\t${chalk.white("ID: ") + production.id}`);
        console.log(
          `\t${chalk.white("Release date: ") + production.release_date}`
        );
        console.log(`\t${chalk.white("Title: ") + production.title}`);
      });
      console.log("\n");

      moviesWithTitle === 0
        ? console.log(
            chalk.yellow(`${person.name} doesn’t appear in any movie\n`)
          )
        : null;
    });
  } else if (requestType === "getPerson") {
    console.log(
      chalk.white(
        `\n
    ----------------------------------------\n`
      )
    );
    console.log(chalk.white(`Person:\n`));
    console.log(chalk.white(`ID: ${obj.id}`));
    console.log(chalk.white("Name: ") + chalk.bold.blue(`${obj.name}`));
    console.log(
      chalk.white(`Birthday: ${obj.birthday}`) +
        chalk.gray(" | ") +
        chalk.white(`${obj.place_of_birth}`)
    );
    obj.known_for_department === "Acting"
      ? console.log(`Department: ${chalk.magenta(obj.known_for_department)}`)
      : null;
    console.log(
      chalk.white("Biography: ") + chalk.bold.blue(`${obj.biography}`)
    );
    alsoKnownAs();
  }

  function alsoKnownAs() {
    if (obj.also_known_as.length > 0) {
      console.log(chalk.white(`\nAlso known as:\n`));
      for (let i = 0; i < obj.also_known_as.length; i++) {
        console.log(chalk.white(obj.also_known_as[i]));
      }
    } else {
      console.log(
        chalk.yellow(`\n${obj.name} doesn't have any alternate names\n`)
      );
    }
  }
}
