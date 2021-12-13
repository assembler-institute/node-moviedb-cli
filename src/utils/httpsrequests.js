import https from "https";

export default function httpsRequest(options) {
  const req = https.request(options, (res) => {
    let data = "";
    res.on("data", (d) => {
      data += d;
    });
    res.on("end", () => {
      const obj = JSON.parse(data);
      return obj;
    });
  });
  req.end();
}
