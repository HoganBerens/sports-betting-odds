import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Odd from './Odd';
import Result from './Result';
import axios from 'axios';

function App() {
  const [results, setResults] = useState();
  const [odds, setOdds] = useState();
  const [date, setDate] = useState(getTodaysDate());
  const [result, setResult] = useState();
  const [odd, setOdd] = useState();
  const [selectedTeams, setSelectedTeams] = useState();

  function getTodaysDate() {
    let d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
  }

  function getSelectedTeams() {
    let data = [];
    let standings = JSON.parse(localStorage.getItem('standings'));
    standings?.forEach((team) => {
      if (
        team.Name === result?.teams.home.teamName ||
        team.Name === result?.teams.away.teamName
      ) {
        data.push(team);
      }
    });
    setSelectedTeams(data);
  }

  useEffect(() => {
    const REACT_APP_STANDINGS_API_KEY = process.env.REACT_APP_STANDINGS_API_KEY;
    axios
      .get(
        `https://api.sportsdata.io/v3/nhl/scores/json/Standings/2024?key=${REACT_APP_STANDINGS_API_KEY}`
      )
      .then((response) => {
        localStorage.setItem('standings', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getSelectedTeams();
  }, [result]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              setOdds={setOdds}
              odds={odds}
              results={results}
              date={date}
              setResults={setResults}
            />
          }
        />
        <Route path="/odds/:id" element={<Odd odd={odd} setOdd={setOdd} />} />
        <Route
          path="/results/:id"
          element={
            <Result
              result={result}
              setResult={setResult}
              selectedTeams={selectedTeams}
              setSelectedTeams={setSelectedTeams}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
