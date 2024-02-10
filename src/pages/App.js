import { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './Dashboard';

function App() {
  const [results, setResults] = useState();
  const [odds, setOdds] = useState();
  const [date, setDate] = useState(getTodaysDate());

  function getTodaysDate() {
    let d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
  }

  return (
    <div className="App">
      <Dashboard
        setOdds={setOdds}
        odds={odds}
        results={results}
        date={date}
        setResults={setResults}
      />
    </div>
  );
}

export default App;
