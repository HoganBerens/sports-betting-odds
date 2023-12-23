const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultsSchema = new Schema(
  {
    teams: {},
    date: {},
    goals: [],
    score: {},
    gameStats: {},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Results", resultsSchema);
