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

app.get("/", function (req, res) {
  Item.find({}, (err, foundItems) => {
    foundItems.length === 0
      ? Item.insertMany(defaultItems, function (err) {
          err ? console.log(err) : console.log("done succissfuly");
          res.redirect("/");
        })
      : err
      ? console.log(err)
      : res.render("list", {
          listTitle: date.getDate(),
          newListItems: foundItems,
        });
  });
});

app.post("/", function (req, res) {
  let itemName = req.body.newItem;
  const item = new Item({ name: itemName });
  item.save();

  res.redirect("/");
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
