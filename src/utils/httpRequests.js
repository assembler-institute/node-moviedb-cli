const { getPersonsByPage } = require("./httpServices");
const ora = require("ora");
const chalk = require("chalk");

async function requestPersonsByPage(page) {
  const spinner = ora("Fetching the popular person's data...").start();
  try {
    const data = await getPersonsByPage(page);
    spinner.succeed();

    // for (let i = 0; i < data.results.length; i++) {
    //   console.log("--------------------" + (i + 1) + "-----------------------");
    //   console.log(data.results[i].name);
    //   console.log("--------------------" + (i + 1) + "-----------------------");
    // }
    if (data.page < data.total_pages) {
      console.log(chalk.white("------------------------------------------"));
      console.log(chalk.white(`Page: ${data.page} of: ${data.total_pages}`));
    }
  } catch (err) {
    spinner.fail();
    console.log(err);
  }
}

module.exports = {
  requestPersonsByPage: requestPersonsByPage,
};
