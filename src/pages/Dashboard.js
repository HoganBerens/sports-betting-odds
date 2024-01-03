import React, { useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { config } from "../utils/configs";

const Dashboard = () => {
  const [results, setResults] = useState([]);
  const [date, setDate] = useState();

  const handleGetDate = (event) => {
    let date = event.target.value;
    axios
      .post("/results/getByDate", { date: date }, config)
      .then((response) => {
        setResults(response.data);
        setDate(date);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleGetOdds = () => {
    const API_KEY = "cb745aa833d11f80015809296c3b72e8";
    let start = new Date();
    let end = new Date();
    let newStart = new Date(start.setHours(start.getHours() + 10));
    let newEnd = new Date(end.setHours(end.getHours() + 20));
    axios
      .get(
        `https://api.the-odds-api.com/v4/sports/icehockey_nhl/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads&oddsFormat=american&commenceTimeFrom=${newStart.toISOString().split(".")[0] + "Z"}&commenceTimeTo=${
          newEnd.toISOString().split(".")[0] + "Z"
        }`
      )
      .then((response) => {
        console.log("done", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="dashboard-wrapper">
      <div onClick={handleGetOdds}>HomePage</div>
      <input type="date" onChange={handleGetDate} />
      <div>Date of Results: {date && date} </div>
      <div className="dashboard-results-wrapper">
        {results.length ? (
          results.map((result, resultIndex) => (
            <div key={resultIndex}>
              <div>
                {result.teams.away.teamName} VS {""}
                {result.teams.home.teamName}
              </div>
            </div>
          ))
        ) : (
          <div>No Results Found</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
