import { config } from "dotenv";
import { Command } from "commander";
import { default as ora } from "ora";

config();

import { getPerson, getPersons } from "./models/personModel.js";
import { showPerson, showPersons } from "./views/personView.js";
import { optionParseInteger } from "./utils/option.js";

const program = new Command();

program.version("0.0.1", "-v, --version", "Display the current version");

program
	.command("get-person")
	.description("Make a network request to fetch most popular persons")
	.requiredOption("-i, --id <number>", "The id of the person", optionParseInteger)
	.action(async (options) => {
		const { id } = options;
		const loader = ora({
			text: "Fetching person details...",
			spinner: "dots",
		});

		try {
			loader.start();

			const data = await getPerson(id);

			showPerson(data);

			loader.succeed("Person details loaded successfully");
		} catch (error) {
			loader.fail(error);
		}
	});

program
	.command("get-persons")
	.description("Make a network request to fetch most popular persons")
	.requiredOption("-p, --popular", "Fetch the popular persons")
	.requiredOption("--page <number>", "The page of persons data results to fetch", optionParseInteger)
	.action(async (options) => {
		const { page } = options;
		const loader = ora({
			text: "Fetching popular persons' data...",
			spinner: "dots",
		});

		try {
			loader.start();

			const data = await getPersons(page);

			showPersons(data);

			loader.succeed("Popular persons' data loaded successfully");
		} catch (error) {
			loader.fail(error);
		}
	});

program.parse(process.argv);
