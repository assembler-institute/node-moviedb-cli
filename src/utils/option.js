import { InvalidArgumentError } from "commander";

function optionParseInteger(value) {
	const number = parseInt(value);

	if (isNaN(number)) throw new InvalidArgumentError("Not an integer value.");

	return number;
}

export { optionParseInteger };

// module.exports = {
// 	optionParseInteger,
// };
