const Odds = require("../models/odd");

async function create(req, res) {
  let date = new Date();
  req.forEach((odd, oddIndex) => {
    Odds.create({
      teams: [req[oddIndex].away_team, req[oddIndex].home_team] || [],
      date: date.toISOString().split("T")[0] || "",
      match_id: req[oddIndex].id || 0,
      head_to_head: [req[oddIndex].bookmakers[0].markets[0].outcomes[0], req[oddIndex].bookmakers[0].markets[0].outcomes[1]] || [],
      spread: [req[oddIndex].bookmakers[0].markets[1].outcomes[0], req[oddIndex].bookmakers[0].markets[1].outcomes[1]] || [],
    });
  });
}

async function getByDate(req, res) {
  let odds = await Odds.find({ date: req.body.date }).lean().exec();
  res.send(odds);
}

async function getOne(req, res) {
  let odd = await Odds.findById(req.params.id).lean().exec();
  res.send(odd);
}

module.exports = {
  create,
  getByDate,
  getOne,
};
