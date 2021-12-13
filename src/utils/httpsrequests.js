import https from "https";
import ora from "ora";
import printInfo from "./printInfo.js";

export default function httpsRequest(options) {
  const req = https.request(options, (res) => {
    let data = "";
    res.on("data", (d) => {
      data += d;
    });
    res.on("end", () => {
      const obj = JSON.parse(data);
      printInfo(obj)
    });
    res.on("error", (err) => {
      console.log(err);
    })
  });
  req.end();
}