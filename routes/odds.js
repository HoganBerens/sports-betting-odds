const express = require("express");
const router = express.Router();
const OddsCtrl = require("../controllers/odds");

router.post("/getByDate", OddsCtrl.getByDate);

router.get("/:id", OddsCtrl.getOne);

module.exports = router;
