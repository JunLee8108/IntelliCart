const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");

// Using .env config
dotenv.config();

// Connecting to MongoDB
mongoose.connect(process.env.MONGO);
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

// Listen to port 4001;
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

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

// Register
app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // Duplicate check
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.send({ message: "Username already exists" });
  }

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
      // res.cookie("token", token).status(201).json("ok");
    });

    const verificationToken = jwt.sign({ userId: createdUser._id }, jwtSecret, {
      expiresIn: "120s",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send a verification email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email Address - IntelliCart",
      text: `This link will be expired in 2 minutes. Please verify your email address by clicking the following link: 
      ${process.env.CLIENT_URL}/verify-email/${verificationToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({ message: "Error sending email" });
      } else {
        return res.status(201).json("email ok");
      }
    });

    res.status(201).json("ok");
  } catch (err) {
    if (err) throw err;
  }
});

app.get("/verify-email/:token", async (req, res) => {
  try {
    const { userId } = jwt.verify(req.params.token, jwtSecret);
    const user = await User.findById(userId);
    if (!user) return res.status(400).send({ message: "User not found" });

    user.isVerified = true;
    await user.save();

    res.send({ message: "Email verified successfully" });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(400).send({ message: "Verification link has expired" });
    }
    return res.status(400).send({ message: "Invalid verification link" });
  }
});

// Login
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

// Forgot password
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.send({ message: "Username doesn't exists" });
  } else {
    return res.send({ message: "Username exists" });
  }
});

// Profile
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

// Chatbot-send message
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
