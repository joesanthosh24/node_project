const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/signUp", (req, res) => {
  res.render("signUp");
});

app.post("/signUp", (req, res) => {
  console.log(req.body);
});

app.get("/signIn", (req, res) => {
  res.render("signIn");
});

app.post("/signIn", (req, res) => {
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
