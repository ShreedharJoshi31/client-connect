// index.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const customerRoutes = require("./routes/customer");
const communicationRoutes = require("./routes/communication");
const verifyToken = require("./middleware/auth");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

mongoose.set("strictQuery", false);
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB database connected");
  } catch (error) {
    console.log("Mongodb database connection failed");
  }
};

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/customers", verifyToken, customerRoutes);
app.use("/api/communications", verifyToken, communicationRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: "Internal Server Error" });
});

const port = 5000;
app.listen(port, () => {
  connectToDatabase();
  console.log(`Server listening on port ${port}`);
});
