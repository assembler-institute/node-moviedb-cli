const ora = require("ora");

const spinner = ora({
  spinner: "soccerHeader",
});

module.exports = {
  spinner: spinner,
};
