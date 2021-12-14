const ora = require("ora");
const getMovie = require("./getMovieReq");
const { white, red, line, boldBlue, yellow } = require("./chalk");

function spinner(id, reviews) {
  const spinner = ora("Fetching movie's data...").start();
  spinner.color = "green";
  spinner.spinner = "aesthetic";

  setTimeout(async () => {
    try {
      const movie = await getMovie(id, reviews);

      if (!reviews) {
        console.log(line, "Movie:\n");
        console.log(`ID: ${white(movie.id)}`);
        console.log(`Title: ${boldBlue(movie.title)}`);
        console.log(`Release Date: ${white(movie.release_date)}`);
        console.log(`Overview: ${boldBlue(movie.overview)}\n`);

        console.log(white(`\nGenres:`));
        if (movie.genres.length > 0) {
          movie.genres.forEach((genre) => {
            console.log(`\t${white(genre.name)}`);
          });
        } else {
          console.log(
            `\nThe movie ${yellow(movie.id)} does not have any declared genre\n`
          );
        }
        console.log(white(`\nSpoken Languages:`));
        if (movie.spoken_languages.length > 0) {
          movie.spoken_languages.forEach((language) => {
            console.log(`\t${white(language.english_name)}`);
          });
        } else {
          console.log(
            `\nThe movie ${yellow(
              movie.id
            )} doesn't have any declared language\n`
          );
        }
        spinner.succeed("\nMovie's data loaded!");
      } else {
        if (movie.results.length > 0) {
          if (movie.total_pages >= movie.page) {
            movie.results.forEach((review) => {
              console.log(`Author: ${boldBlue(review.author)}`);
              if (review.content.length < 400) {
                console.log(`Content: ${white(review.content)}`);
              } else {
                let content = review.content.slice(0, 400);
                console.log(`Content: ${white(content)}...`);
              }
              console.log(line);
            });
            console.log(`Page: ${movie.page} of ${movie.total_pages}`);
          }
        } else {
          console.log(yellow(`The movie ${movie.id} does not have any review`));
        }
        spinner.succeed("\nMovie reviews loaded!");
      }
    } catch (err) {
      spinner.fail("There was an error with the data");
      console.log(red(err));
    }
    spinner.stop();
  }, 2000);
}

module.exports = spinner;
