const { l } = require("./chalk.js");

function asciiPrompt(text, movieColor = "grey") {
  const tapeLines = [
    "_________",
    "] [] [] [",
    "         ",
    "         ",
    "         ",
    "] [] [] [",
    "_________",
    "         ",
  ];

  for (let i = 0; i < tapeLines.length; i++) {
    for (let j = 0; j < text.length; j++) {
      if (i == 3) {
        if (j == text.length - 1) {
          l("    " + text.charAt(j).toUpperCase() + "    \n", "white", true);
        } else {
          l("    " + text.charAt(j).toUpperCase() + "    ", "white", true);
        }
      } else {
        if (j == text.length - 1) {
          l(tapeLines[i] + "\n", movieColor);
        } else {
          l(tapeLines[i], movieColor);
        }
      }
    }
  }
}

module.exports = { asciiPrompt };
