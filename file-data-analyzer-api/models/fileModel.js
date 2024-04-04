const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    originalname: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
      unique: true,
    },
    size: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    wordCount: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
