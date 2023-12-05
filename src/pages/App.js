import "./App.css";
import Dashboard from "./Dashboard";

function App() {
  /* const cron = require("node-cron");

  cron.schedule("5 0 * * *", () => {
    console.log("running a task every minute");
  }); */
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
