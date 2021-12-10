import chalk from "chalk";

function showPerson(data) {
	const {
		id,
		name,
		birthday,
		place_of_birth: birthplace,
		known_for_department: department,
		biography,
		also_known_as: aliases,
	} = data;

	console.log();

	console.log(chalk.white("\n----------------------------------------\n"));
	console.log(`ID: ${chalk.white(id)}`);
	console.log(`Name: ${chalk.blue.bold(name)}`);
	console.log(`Birth: ${chalk.white(birthday)} ${chalk.gray("|")} ${chalk.white(birthplace)}`);
	console.log(`Department: ${department === "Acting" ? chalk.magenta(department) : chalk.white(department)}`);
	console.log(`Biography: ${chalk.blue.bold(biography)}`);

	if (aliases !== undefined) {
		console.log("\nAlso known as:\n");

		aliases.forEach((alias) => {
			console.log(`${chalk.white(alias)}`);
		});
	} else {
		console.log(`\n${chalk.yellow(name)} doesn’t have any alternative names`);
	}

	console.log();
}

function showPersons(data) {
	const persons = data.results || [];

	console.log();

	persons.forEach((person) => {
		const { id, name, known_for_department: department, known_for: movies } = person;

		console.log(chalk.white("\n----------------------------------------\n"));

		console.log(`ID: ${chalk.white(id)}`);
		console.log(`Name: ${chalk.blue.bold(name)}`);
		console.log(`Department: ${department === "Acting" ? chalk.magenta(department) : chalk.white(department)}`);

		if (movies !== undefined) {
			console.log("\nAppearing in movies:\n");

			movies.forEach((movie) => {
				const { id, title, release_date } = movie;

				console.log(`\t${chalk.white("Movie:")}\n`);
				console.log(`\tID: ${chalk.white(id)}`);
				console.log(`\tRelease date: ${chalk.white(release_date)}`);
				console.log(`\tTitle: ${chalk.white(title)}`);
			});
		} else {
			console.log(chalk.orange(`\n${name} doesn’t appear in any movie`));
		}
	});

	console.log();
}

export { showPerson, showPersons };

// module.exports = {
// 	showPerson,
// 	showPersons,
// };
