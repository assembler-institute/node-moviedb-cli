import chalk from "chalk";

export default function printInfo(obj) {

  if(!(obj.page < obj.total_pages)) return

  console.log(
    chalk.white(`
    \n
    ----------------------------------------\n
    Page: ${obj.page} of: ${obj.total_pages}`
    )
  )

  obj.results.forEach(person => {
    console.log(chalk.white("----------------------------------------\n"));
    console.log(chalk.white("PERSON:\n"));
    console.log(chalk.white(`ID: ${person.id}`));
    console.log(`Name: ${chalk.bold.blue(person.name)}`);
    person.known_for_department === "Acting"
      ?
      console.log(`Department: ${chalk.magenta(person.known_for_department)}`)
      :
      null
    console.log("Appearing in movies:");

    let moviesWithTitle = 0
    person.known_for.forEach(production => {
      if (!production.title) return

      moviesWithTitle++
      console.log("\n");
      console.log(`\t${chalk.white("Movie:")}`);
      console.log(`\t${chalk.white("ID: ")+production.id}`);
      console.log(`\t${chalk.white("Release date: ")+production.release_date}`);
      console.log(`\t${chalk.white("Title: ")+production.title}`);
    })
    console.log("\n");
    
    moviesWithTitle === 0 ? console.log(chalk.yellow(`${person.name} doesn’t appear in any movie\n`)) : null
  })
}