const ora = require("ora");

function spinnerStart(command) {
  const spinner = ora(`Loading ${command}`).start();

  return spinner;
}

exports.start = spinnerStart;
