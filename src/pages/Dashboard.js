import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [todaysOdds, setTodaysOdds] = useState([]);

  function getOdds() {
    axios
      .get("https://nhl-score-api.herokuapp.com/api/scores?startDate=2023-12-07&endDate=2023-12-07")
      .then((response) => {
        console.log(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getOdds();
  return <div>Dashboads</div>;
};

export default Dashboard;
