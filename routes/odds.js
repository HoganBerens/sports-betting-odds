const express = require("express");
const router = express.Router();
const OddsCtrl = require("../controllers/odds");

router.post("/getTodays", OddsCtrl.getTodays);

module.exports = router;
