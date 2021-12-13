const { get } = require("./httpServices");
const ora = require("ora");

async function requestAsyncAwait(url) {
  const spinner = ora("Fetching the popular person's data...").start();
  try {
    const data = await get(url);
    spinner.succeed();
    console.log(data);
  } catch (err) {
    spinner.fail();
    console.log(err);
  }
}

module.exports = {
  requestAsyncAwait: requestAsyncAwait,
};
