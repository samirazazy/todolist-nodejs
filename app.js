const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function (req, res) {
  today = new Date();

  today.getDay() === 5 ? res.send("weckend") : res.send("work");
});

app.listen(3000, function () {
  console.log("Server started!");
});
