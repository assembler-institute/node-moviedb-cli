/** @format */

const notifier = require("node-notifier");
const os = require("os");

//console.log("Platform: " + os.platform());
name(os);
function name(os) {
  if (os == "linux") {
    console.log("Platform: " + os.platform());

    //Use linux notifier --notify-osd
    notifier.notify({
        title: mytitle,
        message: msg,
      });

  }elseif (os == "win32"){
    console.log("Platform: " + os.platform());

    //Use win notifier --node-notifier  --libnotify-bin
    notifier.notify({
        title: mytitle,
        message: msg,
      });

    }elseif (os == "darwin"){
        console.log("Platform: " + os.platform());
    
        //Use mac notifier
        notifier.notify({
            title: mytitle,
            message: msg,
          });
        }
  }



  

