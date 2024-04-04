const { getAnalysis } = require("../controllers/dataController");
const router = require("express").Router();

router.post("/getAnalysis", getAnalysis);

module.exports = router;
