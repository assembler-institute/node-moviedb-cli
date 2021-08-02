const notifier = require("node-notifier");
const path = require("path")

function notify(message){
    const imgPath = path.resolve(__dirname, '..') + "/img/nodejs.png"
    notifier.notify({
        title: "NodeDB-CLI Noti",
        message: message,
        icon: imgPath,
        contentImage: undefined
    });
}

module.exports = notify;