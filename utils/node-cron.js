const cron = require("node-cron");
const axios = require("axios");
const oddsController = require("../controllers/odds");
const resultsController = require("../controllers/results");

function oddsCronJob() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  let start = new Date();
  let end = new Date();
  start.setHours(start.getHours() + 8);
  end.setHours(end.getHours() + 25);
  cron.schedule(
    "* 30 6 * * *",
    () => {
      axios
        .get(
          `https://api.the-odds-api.com/v4/sports/icehockey_nhl/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads&oddsFormat=american&bookmakers=draftkings&commenceTimeFrom=${start.toISOString().split(".")[0] + "Z"}&commenceTimeTo=${
            end.toISOString().split(".")[0] + "Z"
          }`
        )
        .then((response) => {
          oddsController.create(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    {
      scheduled: true,
      timezone: "America/Chicago",
    }
  );
}

function resultsCronJob() {
  let start = new Date(Date.now() - 86400000);
  let end = new Date();
  cron.schedule(
    "* 56 10 * * *",
    () => {
      axios
        .get(`https://nhl-score-api.herokuapp.com/api/scores?startDate=${start.toISOString().split("T")[0]}&endDate=${end.toISOString().split("T")[0]}`)
        .then((response) => {
          console.log("Yesterdays Results", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    {
      scheduled: true,
      timezone: "America/Chicago",
    }
  );
}

module.exports = {
  oddsCronJob,
  resultsCronJob,
};
