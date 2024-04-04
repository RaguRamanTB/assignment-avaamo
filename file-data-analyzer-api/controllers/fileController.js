module.exports.uploadFile = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
