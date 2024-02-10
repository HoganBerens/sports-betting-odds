import React, { useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { config } from "../utils/configs";

const Dashboard = (props) => {
  const { results, setResults, setDate, date, setOdds, odds } = props;

  const handleDataByDate = (event) => {
    let date = event.target.value;
    let id = event.target.id.toString();
    axios
      .post(`/${event.target.id}/getByDate`, { date: date }, config)
      .then((response) => {
        if (id === "results") {
          setResults(response.data);
        } else if (id == "odds") {
          setOdds(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetOdds = () => {
    let date = new Date();
    let d = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split("T")[0];
    axios
      .post("/odds/getTodays", { date: d }, config)
      .then((response) => {
        setOdds(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="dashboard-wrapper">
      <div>HomePage</div>
      <div onClick={handleGetOdds}>Get Odds</div>
      <input id="results" type="date" onChange={handleDataByDate} />
      <div>Date of Results: {date && date} </div>
      <div className="dashboard-results-wrapper">
        {results.length ? (
          results.map((result, resultIndex) => (
            <div className="dashboard-result-wrapper" key={resultIndex}>
              {result.teams.away.teamName} VS {""}
              {result.teams.home.teamName}
            </div>
          ))
        ) : (
          <div>No Results Found</div>
        )}
      </div>
      <input id="odds" type="date" onChange={handleDataByDate} />
      <div className="dashboard-odds-wrapper">
        {odds.length ? (
          odds.map((odd, oddIndex) => (
            <div className="dashboard-odd-wrapper" key={oddIndex}>
              {odd.teams[0]} VS {""}
              {odd.teams[1]}
            </div>
          ))
        ) : (
          <div>No Odds Found</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
