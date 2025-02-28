const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 8000;
  const log = `${Date.now()}: ${req.url} : New Req Received\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        res.end("About Page");
        break;
      default:
        res.end("My Website");
    }
  });
// Routes
app.get("/", (req, res) => {
  res.send("Hello From Home Page");
});
app.get("/about", (req, res) => {
  res.send("From About");
});
app.listen(PORT, () => {
  console.log(`server is runing on port http://localhost:${PORT}`);
});
