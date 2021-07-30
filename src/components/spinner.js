// function spinner() {
//   const ora = require("ora");
//   const spinner = ora("Loading data").start();
//   spinner.color = "yellow";
// }
const ora = require("ora");
const spinner = ora();
//spinner.color = "yellow";
//spinner.text = "Error 400";
module.exports = spinner;
