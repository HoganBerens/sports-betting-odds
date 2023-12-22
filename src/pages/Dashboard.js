import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [todaysOdds, setTodaysOdds] = useState([]);
  const [yesterdaysResults, setYesterdaysResults] = useState({});

  function getOdds() {
    axios
      .get("https://nhl-score-api.herokuapp.com/api/scores?startDate=2023-12-22&endDate=2023-12-23")
      .then((response) => {
        console.log(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getOdds();
  return (
    <div>
      <div>HomePage</div>
      <div>Date: </div>
    </div>
  );
};

export default Dashboard;
