import { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Result = (props) => {
  let { result, setResult } = props;
  const STANDINGS_API_KEY = process.env.REACT_APP_STANDINGS_API_KEY;

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`/results/${id}`)
      .then((response) => {
        setResult(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleGetStandings = () => {
    axios
      .get(`https://api.sportsdata.io/v3/nhl/scores/json/Standings/2024?key=${STANDINGS_API_KEY}`)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("standings", JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div onClick={handleGetStandings}>Result</div>
    </div>
  );
};
export default Result;
