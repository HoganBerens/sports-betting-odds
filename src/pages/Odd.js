import { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Odd = (props) => {
  let { odd, setOdd } = props;

  let { id } = useParams();

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
      <div>Odd</div>
    </div>
  );
};
export default Odd;
