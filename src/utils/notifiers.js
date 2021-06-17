const notifier = require("node-notifier");

function notify(title, message) {
  notifier.notify({
    title: title,
    message: message,
    time: 1000,
  });
}

module.exports = {
  notify: notify,
};
