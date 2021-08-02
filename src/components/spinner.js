const ora = require("ora");
const spinner = ora();

// Spinner in 'dots'
spinner.spinner = {
  interval: 80,
  frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
};

// Spinner color in blue
spinner.color = "blue";

module.exports = spinner;
