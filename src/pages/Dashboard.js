import React, { useState } from "react";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const getOdds = () => {
    let date = new Date();
    let start = new Date();
    let end = new Date();
    start.setDate(date.getDate() + 1);
    end.setDate(date.getDate() + 1);
    start.setUTCHours(0, 0, 0);
    end.setUTCHours(23, 59, 59);

    console.log(start.toISOString().split(".")[0] + "Z" + ":" + end.toISOString().split(".")[0] + "Z");

    /* axios
      .get(
        `https://api.the-odds-api.com/v4/sports/icehockey_nhl/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads&oddsFormat=american&bookmakers=draftkings&commenceTimeFrom=${start.toISOString().split(".")[0] + "Z"}&commenceTimeTo=${
          end.toISOString().split(".")[0] + "Z"
        }`
      )
      .then((response) => {
        localStorage.setItem("todays_odds", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      }); */
  };

  const reallyGetOdds = () => {
    let odds = JSON.parse(localStorage.getItem("todays_odds"));
    console.log(odds);
  };

  const getFakeOdds = () => {
    console.log("Got odds");
  };

  return (
    <div>
      <div onClick={getOdds}>Hey</div>
      <div onClick={reallyGetOdds}>Get odds</div>
    </div>
  );
};

export default Dashboard;
