// Imports
// ---------------------------------------------------
const chalk = require("chalk");

// Functions
// ---------------------------------------------------
function l(text, color, bold = false) {
  switch (color) {
    case "black":
      if (bold) {
        console.log(chalk.black.bold(text));
      } else {
        console.log(chalk.black(text));
      }
      break;
    case "red":
      if (bold) {
        console.log(chalk.red.bold(text));
      } else {
        console.log(chalk.red(text));
      }
      break;
    case "green":
      if (bold) {
        console.log(chalk.green.bold(text));
      } else {
        console.log(chalk.green(text));
      }
      break;
    case "yellow":
      if (bold) {
        console.log(chalk.yellow.bold(text));
      } else {
        console.log(chalk.yellow(text));
      }
      break;
    case "blue":
      if (bold) {
        console.log(chalk.blue.bold(text));
      } else {
        console.log(chalk.blue(text));
      }
      break;
    case "magenta":
      if (bold) {
        console.log(chalk.magenta.bold(text));
      } else {
        console.log(chalk.magenta(text));
      }
      break;
    case "cyan":
      if (bold) {
        console.log(chalk.cyan.bold(text));
      } else {
        console.log(chalk.cyan(text));
      }
      break;
    default:
      if (bold) {
        console.log(chalk.white.bold(text));
      } else {
        console.log(chalk.white(text));
      }
  }
}

// Exports
// ---------------------------------------------------
module.exports = { l };
