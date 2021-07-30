const https = require("https");

function requestOptions(path = "person/popular", API_KEY = "") {
  return {
    href: "https://api.themoviedb.org",
    protocol: "https",
    port: 443,
    hostname: "api.themoviedb.org",
    // https://api.themoviedb.org/3
    path: `/3/${path}`,
    method: "GET",
  };
}

function requestPagination(path = "person/popular", page = 1, API_KEY = "") {
  // popular?page=1
  return {
    href: "https://api.themoviedb.org",
    protocol: "https",
    port: 443,
    hostname: "api.themoviedb.org",
    path: `/3/${path}?page=${page}`,
    method: "GET",
  };
}

function requestPersons(requestOptions, oraError, oraSuccess, renderMethod) {
  const request = https.request(requestOptions, function myResponse(response) {
    let wrapperOfData = "";
    response.on("data", function myData(piece) {
      wrapperOfData += piece;
    });

    response.on("end", function myEnd() {
      const data = JSON.parse(wrapperOfData);

      if (renderMethod(data.page, data.total_pages, data.results)) {
        renderMethod(data);
        oraSuccess("Popular Persons data loaded");
      }
    });
  });
  request.on("error", function myError(error) {
    oraError(error.message);
  });

  request.end();
}

function requestPerson(requestOptions, oraError, oraSuccess, renderMethod) {
  const request = https.request(requestOptions, function myResponse(response) {
    let wrapperOfData = "";
    response.on("data", function myData(piece) {
      wrapperOfData += piece;
    });
    response.on("end", function myEnd() {
      const data = JSON.parse(wrapperOfData);
      renderMethod(data);
      oraSuccess("Person data loaded");
    });
  });
  request.on("error", function myError(error) {
    oraError(error.message);
  });

  request.end();
}

module.exports = {
  requestPersons: requestPersons,
  requestPerson: requestPerson,
  requestOptions: requestOptions,
  requestPagination: requestPagination,
};
