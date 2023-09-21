const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Using .env config
dotenv.config();

// Connecting to MongoDB
mongoose.connect(process.env.MONGO);
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);
// Listen to port 4001;
app.use(express.json());
app.listen(4001);
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

// Testing the server
app.get("/test2", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const createdUser = await User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hashedPassword,
  });
  try {
    jwt.sign({ userId: createdUser._id }, jwtSecret, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).status(201).json("ok");      
    });
  } catch (err) {
    if (err) throw err;
  }
});

app.post("/send-message", (req, res) => {
  const userMessage = req.body.userMessage;

  console.log(userMessage);

  let reply;
  if (userMessage.content === "Hello") {
    reply = {
      text: "Thank you for your message. We will get back to you soon.",
    };
  } else {
    reply = {
      text: "Sorry, I didn't understand that.",
    };
  }

  res.json(reply);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    const passOk = bcrypt.compareSync(password, foundUser.password);
    if (passOk) {
      jwt.sign(
        { userId: foundUser._id, email },
        jwtSecret,
        {},
        (err, token) => {
          res.cookie("token", token).json({
            id: foundUser._id,
          });
        }
      );
    }
  }
});

app.get("/profile", (req, res) => {
  const token = req.cookies?.token;

  if (token) {
    jwt.verify(token, jtwSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json("no token");
  }
});
