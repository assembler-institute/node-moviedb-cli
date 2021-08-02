// Imports
// ---------------------------------------------------
const chalk = require("chalk");

// Functions
// ---------------------------------------------------
function l(text, color, bold = false) {
  switch (color) {
    case "black":
      if (bold) {
        process.stdout.write(chalk.black.bold(text));
      } else {
        process.stdout.write(chalk.black(text));
      }
      break;
    case "red":
      if (bold) {
        process.stdout.write(chalk.red.bold(text));
      } else {
        process.stdout.write(chalk.red(text));
      }
      break;
    case "green":
      if (bold) {
        process.stdout.write(chalk.green.bold(text));
      } else {
        process.stdout.write(chalk.green(text));
      }
      break;
    case "yellow":
      if (bold) {
        process.stdout.write(chalk.yellow.bold(text));
      } else {
        process.stdout.write(chalk.yellow(text));
      }
      break;
    case "blue":
      if (bold) {
        process.stdout.write(chalk.blue.bold(text));
      } else {
        process.stdout.write(chalk.blue(text));
      }
      break;
    case "magenta":
      if (bold) {
        process.stdout.write(chalk.magenta.bold(text));
      } else {
        process.stdout.write(chalk.magenta(text));
      }
      break;
    case "cyan":
      if (bold) {
        process.stdout.write(chalk.cyan.bold(text));
      } else {
        process.stdout.write(chalk.cyan(text));
      }
      break;
    default:
      if (bold) {
        process.stdout.write(chalk.white.bold(text));
      } else {
        process.stdout.write(chalk.white(text));
      }
  }
}

// Exports
// ---------------------------------------------------
module.exports = { l };
