const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();
const upload = require("./middlewares/multerUpload");

app.use(cors());
app.use(express.json());

app.post("/upload", upload.single("file"), (req, res) => {
  if (req.file) {
    res.status(201).json({
      message: "File uploaded successfully",
      file: req.file,
    });
  } else {
    res.status(400).json({
      message: "File not uploaded",
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT || 5000}`);
});
