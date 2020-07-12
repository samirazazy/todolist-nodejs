const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemsSchema = { name: String };

const Item = mongoose.model("item", itemsSchema);

const item1 = new Item({ name: "Pay Food" });
const item2 = new Item({ name: "Cook Food" });
const item3 = new Item({ name: "Eat Food" });

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, (err) =>
  err ? console.log(err) : console.log("done")
);

app.get("/", function (req, res) {
  res.render("list", {
    listTitle: "Today",
    newListItems: items,
  });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems,
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started!");
});
