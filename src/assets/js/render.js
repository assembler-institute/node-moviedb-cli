// Imports
// ---------------------------------------------------
const { asciiPrompt } = require("./asciiPrompt.js");
const { l } = require("./chalk.js");
const { undefinedTitle } = require("./helpers.js");

// Render functions
// ---------------------------------------------------
function renderGetPersons(page, apiResponse) {
  asciiPrompt("Popular persons");
  l(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n");
  l(`Page: ${page} of ${apiResponse.total_pages}\n`);
  l(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n");

  apiResponse.results.forEach((person) => {
    l("----------------------------------------\n");
    l("PERSON \n\n");
    l("Id: ", "white", true);
    l(person.id + "\n");
    l("Name: ", "white", true);
    l(person.name + "\n", "blue", true);
    if (person.known_for_department === "Acting") {
      l("Deparment: ", "white", true);
      l(person.known_for_department + "\n", "magenta");
    }

    // Get all movies names
    let movies = new Array();
    person.known_for.forEach((m) => movies.push(m.title));

    // Check if all are titles undefined
    l("Movie carreer: \n", "white", true);
    if (!movies.every(undefinedTitle)) {
      person.known_for.forEach((movie) => {
        // Only show not undefined titles
        if (movie.title != undefined) {
          l("\tMovie:");
          l(`\t${movie.id}`);
          l(`\t${movie.title}`);
          l(`\t${movie.release_date} \n`);
        }
      });
    } else {
      // If only appears in tv shows
      l(`${person.name} doesn’t appear in any movie.\n`, "red");
    }
    l("\n");
  });
}

function renderGetPersonById(apiResponse) {
  let person = apiResponse;
  asciiPrompt(person.name);

  l("Id: ", "white", true);
  l(person.id + "\n");
  l("Name: ", "white", true);
  l(person.name + "\n", "blue", true);
  l("Birthday: ", "white", true);
  if (person.birthday && person.place_of_birth) {
    l(person.birthday + " | " + person.place_of_birth + "\n");
  } else {
    l(`No birthday data of ${person.name}.\n`, "red", true);
  }
  if (person.known_for_department === "Acting") {
    l("Deparment: ", "white", true);
    l(person.known_for_department + "\n", "magenta");
  }
  if (person.biography) {
    l("Biography: ", "white", true);
    l(person.biography + "\n", "blue", true);
  }
  l("Also known as: \n", "white", true);
  if (person.also_known_as != undefined) {
    person.also_known_as.forEach((aka) => {
      l(`\t · ${aka}\n`);
    });
  } else {
    l(`\n${person.name} doesn’t have any alternate names\n`, "red", true);
  }
}

function renderGetMovies(page, nowPlaying, apiResponse) {
  if (nowPlaying) {
    asciiPrompt("Now playing movies");
  } else {
    asciiPrompt("Popular movies");
  }
  l(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n");
  l(`Page: ${page} of ${apiResponse.total_pages}\n`);
  l(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n");

  apiResponse.results.forEach((movie) => {
    l("----------------------------------------\n");
    l("MOVIE \n");
    l("Id: ", "yellow", true);
    l(movie.id + "\n");
    l("Title: ", "blue", true);
    l(movie.title + "\n", "white", true);
    l("Release date: ", "magenta", true);
    l(movie.release_date + "\n\n");
  });
}

function renderGetMovieById(apiResponse) {
  let movie = apiResponse;
  asciiPrompt(movie.original_title);

  l("Id: ", "white", true);
  l(movie.id + "\n", "white");
  l("Title: ", "white", true);
  l(movie.original_title + "\n", "blue", true);
  l("Release date: ", "white", true);
  l(movie.release_date + "\n", "white");
  l("Runtime: ", "white", true);
  l(movie.runtime + "\n", "white");
  l("Vote count: ", "white", true);
  l(movie.vote_count + "\n", "white");
  l("Overview: ", "white", true);
  l(movie.overview + "\n", "white");

  if (movie.spoken_languages) {
    l("Spoken languages: \n", "white", true);
    movie.spoken_languages.forEach((language) => {
      l(`\t · ${language.name}\n`);
    });
  } else {
    l(
      `The movie: ${movie.original_title} doesn’t have any declared languages.`
    );
  }
  l("\n");
}

function renderMovieReviews(apiResponse,apiResponseReviews) {
    
    let movie = apiResponse;
    if (apiResponseReviews.total_pages > 0) {
    apiResponseReviews.results.forEach((review) => {
      l("Author: ", "white", true);
      l(review.author + "\n", "blue", true);
      l("Content: ", "white", true);
      if (review.content.length > 400) {
        l(review.content.slice(0, 400) + "...");
      } else {
        l(review.content, "white", false);
      }
      l("\n\n---\n\n");
    });
  } else {
    l(
      `The movie: ${movie.original_title} doesn’t have any reviews.`,
      "red",
      true
    );
  }
}

module.exports = {
  renderGetPersons,
  renderGetPersonById,
  renderGetMovies,
  renderGetMovieById,
  renderMovieReviews,
};
