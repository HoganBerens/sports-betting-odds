const cron = require("node-cron");
const axios = require("axios");
const oddsController = require("../../controllers/odds");
const resultsController = require("../../controllers/results");

function oddsCronJob() {
  const API_KEY = "cb745aa833d11f80015809296c3b72e8";
  let start = new Date();
  let end = new Date();
  let newStart = new Date(start.setHours(start.getHours() + 11));
  let newEnd = new Date(end.setHours(end.getHours() + 20));
  cron.schedule(
    "00 30 06 * * *",
    () => {
      axios
        .get(
          `https://api.the-odds-api.com/v4/sports/icehockey_nhl/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads&oddsFormat=american&bookmakers=draftkings&commenceTimeFrom=${newStart.toISOString().split(".")[0] + "Z"}&commenceTimeTo=${
            newEnd.toISOString().split(".")[0] + "Z"
          }`
        )
        .then((response) => {
          oddsController.create(response.data);
          localStorage.setItem("odds", JSON.stringify(response.data));
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
  let end = new Date(Date.now() - 86300000);
  cron.schedule(
    "00 29 06 * * *",
    () => {
      axios
        .get(`https://nhl-score-api.herokuapp.com/api/scores?startDate=${start.toISOString().split("T")[0]}&endDate=${end.toISOString().split("T")[0]}`)
        .then((response) => {
          resultsController.createResults(response.data[0]);
          localStorage.setItem("results", JSON.stringify(response.data));
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
