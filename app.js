const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

const Schema = mongoose.Schema;

mongoose.connect("localhost:27017/chatDB");

const messageSchema = {
  message: { type: String, required: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room' }
}

const Message = mongoose.model("Message", messageSchema);

const poepleSchema = {
  name: { type: String, required: true },
  messages: { type: [messageSchema] }
}

const People = mongoose.model("People", poepleSchema);

const roomSchema = {
  name: {
    type: String,
    required: true
  },
  people: {
    type: [poepleSchema]
  }
}

const Room = mongoose.model("Room", roomSchema);

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
