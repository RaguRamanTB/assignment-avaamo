const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const fileRoutes = require("./routes/fileRoutes");
const dataRoutes = require("./routes/dataRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/files", fileRoutes);
app.use("/api/data", dataRoutes);

// Connect to MongoDB
const uri = "mongodb://mongo-db/file_data_analyzer";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT || 5000}`);
});
