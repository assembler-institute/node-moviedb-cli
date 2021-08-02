// Api constants
require("dotenv").config();
const API_KEY = process.env.API_KEY;
const API_HOSTNAME = "api.themoviedb.org";
const API_TIMEOUT_REQUEST = "2000";

//Separator constant
const SECTION_SEPARATOR =
  "---------------------------------------------------------------";

module.exports = {
  API_KEY: API_KEY,
  API_HOSTNAME: API_HOSTNAME,
  API_TIMEOUT_REQUEST: API_TIMEOUT_REQUEST,
  SECTION_SEPARATOR: SECTION_SEPARATOR,
};
