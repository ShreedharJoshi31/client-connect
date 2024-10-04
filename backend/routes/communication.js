// routes/communication.js
const express = require("express");
const router = express.Router();
const Communication = require("../models/Communication");
const Customer = require("../models/Customer");
const verifyToken = require("../middleware/auth");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post("/send-email", verifyToken, async (req, res) => {
  try {
    const { subject, content } = req.body;
    const customers = await Customer.find();
    const emailList = customers.map((customer) => customer.email);

    const info = await transporter.sendMail({
      from: '"Elechemy test mail 👻" <shreedharjoshi03@gmail.com>',
      to: emailList.join(", "),
      subject: subject,
      text: content,
    });

    res.status(200).send({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error sending email", err: err });
    console.log(err);
  }
});

// Create Communication for All Customers
router.post("/", verifyToken, async (req, res) => {
  try {
    const { conversation, timestamp } = req.body;

    // Get all customers
    const customers = await Customer.find();

    // Create communications for each customer
    const communications = customers.map((customer) => ({
      customerId: customer._id,
      conversation,
      timestamp,
    }));

    await Communication.insertMany(communications);

    res.status(201).send({ message: "Communications created successfully" });
  } catch (err) {
    res.status(400).send({ message: "Error creating communications" });
  }
});

// Create Communication
router.post("/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const { conversation, timestamp } = req.body;
    const communication = new Communication({
      customerId,
      conversation,
      timestamp,
    });
    await communication.save();
    res.status(201).send({ message: "Communication created successfully" });
  } catch (err) {
    res.status(400).send({ message: "Error creating communication" });
  }
});

// Get Communications by Customer ID
router.get("/:customerId", verifyToken, async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const communications = await Communication.find({ customerId });
    res.status(200).send(communications);
  } catch (err) {
    res.status(500).send({ message: "Error fetching communications" });
  }
});

module.exports = router;
