const express = require("express");
const router = express.Router();
const ResultsCtrl = require("../controllers/results");

router.post("/getByDate", ResultsCtrl.getByDate);

router.get("/:id", ResultsCtrl.getOne);

module.exports = router;
