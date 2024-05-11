// routes/customer.js
const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const verifyToken = require("../middleware/auth");

// Create Customer
router.post("/", verifyToken, async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, phone, address, gstNo, frequencyOfAutomatedReminder } =
      req.body;
    const customer = new Customer({
      name,
      email,
      phone,
      address,
      gstNo,
      frequencyOfAutomatedReminder,
    });
    await customer.save();
    res.status(201).send({ message: "Customer created successfully" });
  } catch (err) {
    res.status(400).send({ message: "Error creating customer" });
  }
});

// Get All Customers
router.get("/", verifyToken, async (req, res) => {
  try {
    const customers = await Customer.aggregate([
      {
        $lookup: {
          from: "communications",
          localField: "_id",
          foreignField: "customerId",
          as: "communications",
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          phone: 1,
          address: 1,
          gstNo: 1,
          communicationCount: { $size: "$communications" },
        },
      },
    ]);
    res.status(200).send(customers);
  } catch (err) {
    res.status(500).send({ message: "Error fetching customers" });
  }
});

// Get Customer by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).send({ message: "Customer not found" });
    }
    res.status(200).send(customer);
  } catch (err) {
    res.status(500).send({ message: "Error fetching customer" });
  }
});

// Update Customer
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id).populate("communicationCount");
    if (!customer) {
      return res.status(404).send({ message: "Customer not found" });
    }
    const { name, email, phone, address, gstNo, frequencyOfAutomatedReminder } =
      req.body;
    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    customer.address = address;
    customer.gstNo = gstNo;
    customer.frequencyOfAutomatedReminder = frequencyOfAutomatedReminder;
    await customer.save();
    res.status(200).send({ message: "Customer updated successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error updating customer" });
  }
});

// Delete Customer
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.findByIdAndDelete(id);
    res.status(200).send({ message: "Customer deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error deleting customer" });
  }
});

module.exports = router;
