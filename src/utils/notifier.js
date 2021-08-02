const notifier = require("node-notifier");
const path = require("path");

function notify(message) {
  notifier.notify({
    title: "Movie DB CLI",
    message: message,
    contentImage: path.resolve(__dirname, "../img/tmdb.png"),
    wait: false, // This doesn't work on Windows.
    icon: path.resolve(__dirname, "../img/tmdb.png"),
  });
}

module.exports = { notify: notify };
