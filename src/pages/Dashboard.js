import React, { useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { config } from '../utils/configs';

const Dashboard = (props) => {
  const { results, setResults, date, setOdds, odds } = props;

  const handleGetDataByDate = (event) => {
    let day = event.target.value;
    let id = event.target.id;
    let idString = id.toString();
    axios
      .post(`/${id}/getByDate`, { date: day }, config)
      .then((response) => {
        if (idString === 'results') {
          setResults(response.data);
        } else if (idString == 'odds') {
          setOdds(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .post('/odds/getByDate', { date: date }, config)
      .then((response) => {
        setOdds(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let myDate = new Date(JSON.stringify(date));
    let d = myDate.getDate() - 1;
    let m = myDate.getMonth() + 1;
    let y = myDate.getFullYear();
    if (m < 10) {
      m = m.toString().padStart(2, '0');
    }
    if (d < 10) {
      d = d.toString().padStart(2, '0');
    }
    axios
      .post('/results/getByDate', { date: `${y}-${m}-${d}` }, config)
      .then((response) => {
        setResults(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="dashboard-wrapper">
      <div>HomePage</div>
      <input id="results" type="date" onChange={handleGetDataByDate} />
      <div>Date of Results: {date && date} </div>
      <div className="dashboard-results-wrapper">
        {results ? (
          results.map((result, resultIndex) => (
            <div className="dashboard-result-wrapper" key={resultIndex}>
              {result.teams.away.teamName} VS {''}
              {result.teams.home.teamName}
            </div>
          ))
        ) : (
          <div>No Results Found</div>
        )}
      </div>
      <input id="odds" type="date" onChange={handleGetDataByDate} />
      <div className="dashboard-odds-wrapper">
        {odds ? (
          odds.map((odd, oddIndex) => (
            <div className="dashboard-odd-wrapper" key={oddIndex}>
              {odd.teams[0]} VS {''}
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
