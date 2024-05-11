// models/Communication.js
const mongoose = require("mongoose");

const communicationSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  conversation: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Communication", communicationSchema);
