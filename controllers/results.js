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

async function getOne(req, res) {
  let result = await Results.findById(req.params.id).lean().exec();
  res.send(result);
}

module.exports = {
  createResults,
  getByDate,
  getOne,
};
