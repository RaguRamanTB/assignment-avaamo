const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    originalname: {
      type: String,
      required: true,
    },
    lastModified: {
      type: Number,
      required: true,
    },
    analysisData: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Analysis", analysisSchema);
