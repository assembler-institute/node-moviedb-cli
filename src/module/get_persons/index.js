const { getPersonsRequest } = require("./get-persons-request");
const { readLocalGetPersonsData } = require("./get-persons-data-local-handle");

module.exports = {
  getPersonsRequest: getPersonsRequest,
  readLocalGetPersonsData: readLocalGetPersonsData,
};
