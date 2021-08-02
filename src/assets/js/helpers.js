// Imports
// ---------------------------------------------------
const fs = require("fs");

// Functions
// ---------------------------------------------------
// Check if name of movie is undefined
let undefinedTitle = function returnUndefined(element) {
  if (element === undefined) {
    return true;
  }
};

function checkFolder(folderName, fileName, fileData) {
  // If folder doesn't exists create folder + file
  const folderPath = "resources/" + folderName;
  const pathFile = +"/" + fileName;

  if (!fs.existsSync("resources")) {
    fs.mkdirSync("resources");
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      createFile(folderPath, fileName, fileData);
    } else if (fs.existsSync(folderPath) && !fs.existsSync(pathFile)) {
      createFile(folderPath, fileName, fileData);
    }
  } else {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      createFile(folderPath, fileName, fileData);
    } else if (fs.existsSync(folderPath) && !fs.existsSync(pathFile)) {
      createFile(folderPath, fileName, fileData);
    }
  }
}

function createFile(folderPath, fileName, fileData) {
  fs.writeFile(
    folderPath + "/" + fileName,
    JSON.stringify(fileData),
    function (err) {
      if (err) throw err;
      // console.log("Created file");
    }
  );
}

// Exports
// ---------------------------------------------------
module.exports = { undefinedTitle, checkFolder };
