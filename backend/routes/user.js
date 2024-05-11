// routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/auth");

// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    res.status(400).send({ message: "Error creating user" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    user.verificationToken = token;
    await user.save();
    res.status(200).send({ token, userId: user._id });
  } catch (err) {
    res.status(500).send({ message: "Error logging in" });
  }
});

// Verify User
router.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).send({ message: "Invalid verification token" });
    }
    user.verified = true;
    await user.save();
    res.status(200).send({ message: "User verified successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error verifying user" });
  }
});

module.exports = router;
