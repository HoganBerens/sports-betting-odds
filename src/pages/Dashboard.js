import React, { useState } from "react";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [odds, setOdds] = useState([]);

  const getOdds = () => {
    axios
      .get(
        `https://api.the-odds-api.com/v4/sports/icehockey_nhl/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads&oddsFormat=american&bookmakers=draftkings&commenceTimeFrom=2023-12-05T00:00:00Z&commenceTimeTo=2023-12-05T23:59:59Z`
      )
      .then((response) => {
        localStorage.setItem("todays_odds", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reallyGetOdds = () => {
    let odds = JSON.parse(localStorage.getItem("todays_odds"));
    console.log(odds);
  };

  const getTomorrowDate = () => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    console.log(date.toISOString());
  };

  return (
    <div>
      <div onClick={getOdds}>Hey</div>
      <div onClick={reallyGetOdds}>Get odds</div>
    </div>
  );
};

export default Dashboard;
