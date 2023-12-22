const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const oddsSchema = new Schema(
  {
    teams: [],
    date: String,
    match_id: String,
    head_to_head: [],
    spread: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Odds", oddsSchema);
