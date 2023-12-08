const Odds = require("../models/odds");

async function create(req, res) {
  req.forEach((odd, oddIndex) => {
    Odds.create({
      teams: [req[oddIndex].away_team, req[oddIndex].home_team],
      date: req[oddIndex].commence_time,
      match_id: req[oddIndex].id,
      /* head_to_head: [req[oddIndex].bookmakers[0].markets[0].outcomes[0], req[oddIndex].bookmakers[0].markets[0].outcomes[1]],
      spread: [req[oddIndex].bookmakers[0].markets[1].outcomes[0], req[oddIndex].bookmakers[0].markets[1].outcomes[1]], */
    });
  });
}

module.exports = {
  create,
};
