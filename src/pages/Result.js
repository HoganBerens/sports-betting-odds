import { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Result = (props) => {
  let { result, setResult } = props;

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

  return (
    <div>
      <div>Result</div>
    </div>
  );
};
export default Result;
