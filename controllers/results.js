const Results = require("../models/result");

async function createResults(req, res) {
  let date = req.date.raw;
  req.games.forEach((game) => {
    Results.create({
      teams: game.teams,
      date: date,
      goals: game.goals,
      gameStats: game.gameStats,
    });
  });
}

async function getByDate(req, res) {
  let results = await Results.find({ date: req.body.date }).lean().exec();
  res.send(results);
}

function getAll(req, res) {
  let results = Results.find({}).lean;
  res.send(results);
}

module.exports = {
  createResults,
  getByDate,
  getAll,
};
