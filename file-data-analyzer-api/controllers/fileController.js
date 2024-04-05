const fs = require("fs");
const path = require("path");
const File = require("../models/fileModel");

module.exports.uploadFile = async (req, res, next) => {
  try {
    if (req.file) {
      const lastModified = req.body.lastModified;
      const existingFile = await File.findOne({
        originalname: req.file.originalname,
        lastModified,
      });

      if (existingFile) {
        fs.unlinkSync(path.join(__dirname, "..", existingFile.path));
        await File.findByIdAndDelete(existingFile._id);
      }

      const file = await File.create({
        originalname: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        type: req.file.mimetype,
        path: req.file.path,
        lastModified,
      });

      return res.status(201).json({
        message: "File uploaded successfully",
        file,
      });
    }
    return res.status(400).json({
      message: "File not uploaded",
    });
  } catch (error) {
    next(error);
  }
};
