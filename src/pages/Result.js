import { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Result = (props) => {
  let { result, setResult, selectedTeams, setSelectedTeams } = props;
  let { id } = useParams();

  const logTeams = () => {
    console.log(selectedTeams);
  };

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

  return (
    <div>
      <div onClick={logTeams}>Team Standings</div>
    </div>
  );
};
export default Result;
