const ora = require("ora");

function spinnerStart(endPoint) {
  let spinner = "";
  switch (endPoint) {
    case "person/popular":
      spinner = ora("Fetching the popular person's data...").start();
      return spinner;
    case "movie/popular":
      spinner = ora("Fetching the movies data...").start();
      return spinner;
    case "movie/now_playing":
      spinner = ora("Fetching the movies data...").start();
      return spinner;
  }
}

exports.start = spinnerStart;
