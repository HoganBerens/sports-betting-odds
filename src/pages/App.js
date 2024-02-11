import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Odd from "./Odd";
import Result from "./Result";

function App() {
  const [results, setResults] = useState();
  const [odds, setOdds] = useState();
  const [date, setDate] = useState(getTodaysDate());
  const [result, setResult] = useState();
  const [odd, setOdd] = useState();

  function getTodaysDate() {
    let d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split("T")[0];
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard setOdds={setOdds} odds={odds} results={results} date={date} setResults={setResults} />} />
        <Route path="/odds/:id" element={<Odd odd={odd} setOdd={setOdd} />} />
        <Route path="/results/:id" element={<Result result={result} setResult={setResult} />} />
      </Routes>
    </div>
  );
}

export default App;
