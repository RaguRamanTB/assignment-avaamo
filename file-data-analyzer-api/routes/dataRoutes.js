const { getAnalysis, maskData } = require("../controllers/dataController");
const router = require("express").Router();

router.post("/getAnalysis", getAnalysis);
router.post("/mask", maskData);

module.exports = router;
