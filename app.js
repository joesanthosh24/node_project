const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const PORT = process.env.PORT || 3000;

const rooms = [
  { name: "Room 1", people: [], messages: [] },
  { name: "Room 2", people: [], messages: [] },
  { name: "Room 3", people: [], messages: [] },
];

const people = [];
let error = "";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/signUp", (req, res) => {
  res.render("signUp", { error });
  error = "";
});

app.post("/signUp", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const person = people.find((person) => person.email === email);

  console.log(person);

  if (!person) {
    error = "";
    people.push({ email, password });

    res.redirect(`/chat?mail=${email}`);
  }
  else {
    error = "User with that email already exists";
    res.redirect("/signUp");
  }
});

app.get("/chat", (req, res) => {
  const email = req.query.mail;

  res.render("chat", { email, rooms, people });
});

app.get("/signIn", (req, res) => {
  res.render("signIn", { error });
  error = "";
});

app.post("/signIn", (req, res) => {
  const { email, password } = req.body;
  const person = people.find(
    (person) => person.email === email && person.password === password
  );

  if (person) {
    error = "";
    res.redirect(`/chat?mail=${email}`);
  } else {
    error = "Username and/or password incorrect"
    res.redirect("/signIn")
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
