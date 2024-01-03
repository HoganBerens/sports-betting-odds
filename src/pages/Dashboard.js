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

  return (
    <div className="dashboard-wrapper">
      <div>HomePage</div>
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
