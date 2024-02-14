import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const Result = (props) => {
  const [result, setResult] = useState({ teams: [] });
  let { selectedTeams } = props;
  let { id } = useParams();

  const logTeams = () => {
    console.log(result);
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
      <div></div>
    </div>
  );
};
export default Result;
