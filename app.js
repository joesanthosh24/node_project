const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/chatDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const messageSchema = {
  message: { type: String, required: true },
  room: { type: Schema.Types.ObjectId, ref: "Room" },
};

const Message = mongoose.model("Message", messageSchema);

const poepleSchema = {
  email: { type: String, required: true },
  password: { type: String, required: true },
  messages: { type: [messageSchema] },
};

const Person = mongoose.model("Person", poepleSchema);

const roomSchema = {
  name: {
    type: String,
    required: true,
  },
  people: {
    type: [poepleSchema],
  },
};

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

  const person = new Person({
    email,
    password,
    messages: [],
  });

  Person.findOne({ email }, (err, foundPerson) => {
    if (!foundPerson) {
      error = "";
      person.save();

      res.redirect(`/chat?mail=${email}`);
    } else {
      error = "User with that email already exists";
      res.redirect("/signUp");
    }
  });
});

app.get("/chat", (req, res) => {
  const email = req.query.mail;

  Room.find({}, (err, rooms) => {
    res.render("chat", { email, rooms });
  });
});

app.get("/signIn", (req, res) => {
  res.render("signIn", { error });
  error = "";
});

app.post("/signIn", (req, res) => {
  const { email, password } = req.body;

  Person.findOne({ email }, (err, foundDocument) => {
    if (foundDocument) {
      error = "";
      res.redirect(`/chat?mail=${email}`);
    } else {
      error = "Username and/or password incorrect";
      res.redirect("/signIn");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
