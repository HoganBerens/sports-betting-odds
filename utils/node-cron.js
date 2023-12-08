const cron = require("node-cron");
const axios = require("axios");
const controller = require("../controllers/odds");

function cronJob() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  let start = new Date();
  let end = new Date();
  start.setHours(start.getHours() + 8);
  end.setHours(end.getHours() + 25);
  cron.schedule(
    "* 0 3 * * *",
    () => {
      axios
        .get(
          `https://api.the-odds-api.com/v4/sports/icehockey_nhl/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads&oddsFormat=american&bookmakers=draftkings&commenceTimeFrom=${start.toISOString().split(".")[0] + "Z"}&commenceTimeTo=${
            end.toISOString().split(".")[0] + "Z"
          }`
        )
        .then((response) => {
          controller.create(response.data);
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

function newCronJob() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  let start = new Date();
  let end = new Date();
  start.setHours(start.getHours() + 8);
  end.setHours(end.getHours() + 25);
  cron.schedule(
    "* 30 12 * * *",
    () => {
      axios
        .get(`https://api.the-odds-api.com/v4/sports/icehockey_nhl/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads&oddsFormat=american&bookmakers=draftkings`)
        .then((response) => {
          controller.create(response.data);
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
  cronJob,
  newCronJob,
};
