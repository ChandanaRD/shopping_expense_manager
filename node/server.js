require("./models/db");
const express = require("express");
const BodyParser = require("body-parser");
const path = require("path");
const allNoteController = require("./controllers/blueNoteController.js");

var app = express();

app.use(BodyParser.json());
app.use(
  BodyParser.urlencoded({
    extended: true,
  })
);
app.listen(3001, () => {
  console.log("node server started and listening to port 3001");
});

app.use(
  express.static(path.join(__dirname, "public", "shopping_expense_manager"))
);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Server is up!");
});

app.use("/allNotes", allNoteController);
