import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Odd from './Odd';
import Result from './Result';

function App() {
  const [date, setDate] = useState(getTodaysDate());
  const [selectedTeams, setSelectedTeams] = useState();

  function getTodaysDate() {
    let d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard date={date} />} />
        <Route
          path="/odds/:id"
          element={<Odd selectedTeams={selectedTeams} />}
        />
        <Route
          path="/results/:id"
          element={<Result selectedTeams={selectedTeams} />}
        />
      </Routes>
    </div>
  );
}

export default App;
