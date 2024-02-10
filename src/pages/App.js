import { useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";

function App() {
  const [results, setResults] = useState([]);
  const [odds, setOdds] = useState([]);
  const [date, setDate] = useState();
  return (
    <div className="App">
      <Dashboard setDate={setDate} setOdds={setOdds} odds={odds} results={results} date={date} setResults={setResults} />
    </div>
  );
}

export default App;
