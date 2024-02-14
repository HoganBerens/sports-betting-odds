import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const Odd = (props) => {
  const [odd, setOdd] = useState({ teams: [] });
  let { selectedTeams } = props;

  let { id } = useParams();

  const handleLogTeams = () => {
    console.log(selectedTeams, odd);
  };

  useEffect(() => {
    axios
      .get(`/odds/${id}`)
      .then((response) => {
        setOdd(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <div onClick={handleLogTeams}>Odd</div>
    </div>
  );
};
export default Odd;
