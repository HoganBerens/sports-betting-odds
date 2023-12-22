import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [todaysOdds, setTodaysOdds] = useState([]);
  const [yesterdaysResults, setYesterdaysResults] = useState({});

  function getOdds() {
    let start = new Date(Date.now() - 86400000);
    let end = new Date(Date.now() - 86300000);
    axios
      .get(`https://nhl-score-api.herokuapp.com/api/scores?startDate=${start.toISOString().split("T")[0]}&endDate=${end.toISOString().split("T")[0]}`)
      .then((response) => {
        console.log("Yesterdays Results", response.data);
      })
      .catch((error) => {
        console.log(error);
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
