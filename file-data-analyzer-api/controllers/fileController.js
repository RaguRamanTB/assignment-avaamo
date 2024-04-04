const File = require("../models/fileModel");

module.exports.uploadFile = async (req, res, next) => {
  try {
    if (req.file) {
      const file = await File.create({
        originalname: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        type: req.file.mimetype,
        path: req.file.path,
      });
      res.status(201).json({
        message: "File uploaded successfully",
        file,
      });
    } else {
      res.status(400).json({
        message: "File not uploaded",
      });
    }
  } catch (error) {
    next(error);
  }
};
