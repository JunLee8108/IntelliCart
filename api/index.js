const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
// Using .env config
dotenv.config();

// Connecting to MongoDB
mongoose.connect(process.env.MONGO);
const jwtSecret = process.env.JWT_SECRET;
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
  const { username, password } = req.body;
  const createdUser = await User.create({
    username: username,
    password: password,
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
