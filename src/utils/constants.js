const path = require("path");
require("dotenv").config();

// Api constants
const API_KEY = process.env.API_KEY;
const API_HOSTNAME = "api.themoviedb.org";
const API_TIMEOUT_REQUEST = "1000";

// Separator constant
const SECTION_SEPARATOR =
  "---------------------------------------------------------------";

// Paths constants
const GENERAL_PATH_FILES = "files";

// Persons
const PERSONS_FOLDER_NAME = "persons folder";
const PERSONS_FOLDER_PATH = path.join(GENERAL_PATH_FILES, PERSONS_FOLDER_NAME);
const PERSONS_FILE_NAME = "popular-persons.json";
const PERSONS_FILE_PATH = path.resolve(PERSONS_FOLDER_PATH, PERSONS_FILE_NAME);

// Person
const PERSON_FILE_NAME = "person.json";
const PERSON_FILE_PATH = path.resolve(PERSONS_FOLDER_PATH, PERSON_FILE_NAME);

// Movies
const MOVIES_FOLDER_NAME = "movies folder";
const MOVIES_FOLDER_PATH = path.join(GENERAL_PATH_FILES, MOVIES_FOLDER_NAME);
const MOVIES_FILE_NAME = "popular-movies.json";
const MOVIES_FILE_PATH = path.resolve(MOVIES_FOLDER_PATH, MOVIES_FILE_NAME);

// Movies now playing
const MOVIES_NP_FILE_NAME = "now-playing-movies.json";
const MOVIES_NP_FILE_PATH = path.resolve(
  MOVIES_FOLDER_PATH,
  MOVIES_NP_FILE_NAME
);

// Movie
const MOVIE_FILE_NAME = "movie.json";
const MOVIE_FILE_PATH = path.resolve(MOVIES_FOLDER_PATH, MOVIE_FILE_NAME);

// Movie with reviews
const MOVIE_REVIEWS_FILE_NAME = "movie-reviews.json";
const MOVIE_REVIEWS_FILE_PATH = path.resolve(
  MOVIES_FOLDER_PATH,
  MOVIE_REVIEWS_FILE_NAME
);

// Icon
const ICON_NAME = "app-icon.png";
const ICON_PATH = path.join("files", ICON_NAME);

module.exports = {
  API_KEY: API_KEY,
  API_HOSTNAME: API_HOSTNAME,
  API_TIMEOUT_REQUEST: API_TIMEOUT_REQUEST,
  SECTION_SEPARATOR: SECTION_SEPARATOR,
  PERSONS_FOLDER_PATH: PERSONS_FOLDER_PATH,
  PERSONS_FILE_PATH: PERSONS_FILE_PATH,
  PERSON_FILE_PATH: PERSON_FILE_PATH,
  MOVIES_FOLDER_PATH: MOVIES_FOLDER_PATH,
  MOVIES_FILE_PATH: MOVIES_FILE_PATH,
  MOVIES_NP_FILE_PATH: MOVIES_NP_FILE_PATH,
  MOVIE_FILE_PATH: MOVIE_FILE_PATH,
  MOVIE_REVIEWS_FILE_PATH: MOVIE_REVIEWS_FILE_PATH,
  ICON_PATH: ICON_PATH,
};
