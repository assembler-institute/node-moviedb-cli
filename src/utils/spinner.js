const ora = require("ora");

function spinnerStart(endPoint) {
  let spinner = "";

  if (endPoint === "person/popular") {
    spinner = ora("Fetching the popular person's data...").start();
    return spinner;
  } else if (endPoint === "movie/popular") {
    spinner = ora("Fetching the movies data...").start();
    return spinner;
  } else if (endPoint === "movie/now_playing") {
    spinner = ora("Fetching the movies data...").start();
    return spinner;
  } else if (endPoint.includes("movie/")) {
    spinner = ora("Fetching the movie data...").start();
    return spinner;
  } else if (endPoint.includes("person/")) {
    spinner = ora("Fetching the person data...").start();
    return spinner;
  }
}

exports.start = spinnerStart;
