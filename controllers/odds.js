const Odds = require('../../models/odds');

async function create(req, res) {
  const odd = await Odds.create({
    teams: [req.body.away_team, req.body.home_team],
    date: req.body.commence_time,
    match_id: req.body.id,
    head_to_head: [
      req.body.bookmakers[0].markets[0].outcomes[0],
      req.body.bookmakers[0].markets[0].outcomes[1],
    ],
    spread: [
      req.body.bookmakers[0].markets[1].outcomes[0],
      req.body.bookmakers[0].markets[1].outcomes[1],
    ],
  });
  res.send(odd);
}

module.exports = {
  create,
};
