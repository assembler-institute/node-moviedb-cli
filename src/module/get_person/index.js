const { getPersonRequest } = require("./get-person-request");
const { readLocalGetPersonData } = require("./get-person-data-local-handle");

module.exports = {
  getPersonRequest: getPersonRequest,
  readLocalGetPersonData: readLocalGetPersonData,
};
