const { uploadFile } = require("../controllers/fileController");
const router = require("express").Router();
const upload = require("../middlewares/multerUpload");

router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
