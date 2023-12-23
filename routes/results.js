const express = require("express");
const router = express.Router();
const resultsCtrl = require("../controllers/results");

router.post("/getByDate", resultsCtrl.getByDate);

router.get("/getAll", resultsCtrl.getAll);

module.exports = router;
